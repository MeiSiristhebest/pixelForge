import boto3
from botocore.config import Config
from botocore.exceptions import ClientError
import base64
import io
from typing import Optional

from app.config import get_settings

settings = get_settings()


class R2Service:
    """Cloudflare R2 storage service (S3-compatible)."""

    def __init__(self):
        self._client = None
        self._bucket = settings.r2_bucket

    @property
    def client(self):
        """Lazy initialization of boto3 client."""
        if self._client is None:
            if not settings.r2_account_id:
                raise ValueError("R2_ACCOUNT_ID not configured")
            self._client = boto3.client(
                service_name="s3",
                endpoint_url=f"https://{settings.r2_account_id}.r2.cloudflarestorage.com",
                aws_access_key_id=settings.r2_access_key_id,
                aws_secret_access_key=settings.r2_secret_access_key,
                region_name="auto",
                config=Config(signature_version="s3v4"),
            )
        return self._client

    @property
    def bucket(self):
        return self._bucket

    def generate_presigned_upload_url(
        self, key: str, content_type: str = "image/png", expires_in: int = 3600
    ) -> str:
        """Generate presigned URL for direct client upload."""
        return self.client.generate_presigned_url(
            "put_object",
            Params={
                "Bucket": self.bucket,
                "Key": key,
                "ContentType": content_type,
            },
            ExpiresIn=expires_in,
        )

    def generate_presigned_download_url(self, key: str, expires_in: int = 3600) -> str:
        """Generate presigned URL for downloading."""
        return self.client.generate_presigned_url(
            "get_object",
            Params={"Bucket": self.bucket, "Key": key},
            ExpiresIn=expires_in,
        )

    def upload_from_base64(
        self, base64_data: str, key: str, content_type: str = "image/png"
    ) -> str:
        """Upload base64-encoded image to R2."""
        # Handle data URL format
        if "," in base64_data:
            base64_data = base64_data.split(",")[1]

        image_bytes = base64.b64decode(base64_data)
        buffer = io.BytesIO(image_bytes)

        self.client.upload_fileobj(
            buffer, self.bucket, key, ExtraArgs={"ContentType": content_type}
        )

        # Return public URL
        return f"{settings.r2_public_url}/{key}"

    def upload_from_bytes(
        self, data: bytes, key: str, content_type: str = "image/png"
    ) -> str:
        """Upload bytes to R2."""
        buffer = io.BytesIO(data)
        self.client.upload_fileobj(
            buffer, self.bucket, key, ExtraArgs={"ContentType": content_type}
        )
        return f"{settings.r2_public_url}/{key}"

    def delete_object(self, key: str) -> bool:
        """Delete object from R2."""
        try:
            self.client.delete_object(Bucket=self.bucket, Key=key)
            return True
        except ClientError:
            return False


# Singleton instance
r2_service = R2Service()
