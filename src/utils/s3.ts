import "dotenv/config";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const endpoint = (process.env.S3_ENDPOINT || "").replace(/\/+$/, "");
const s3 = new S3Client({
  endpoint,
  region: process.env.S3_REGION || "auto",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
  forcePathStyle: true,
});

export const ALLOWED_FOLDERS = ["members", "projects", "events", "blogs"];

/**
 * Extracts the S3 object key from a stored upload URL of the form
 * `<origin>/api/files/<folder>/<key>`. Returns null for empty or
 * non-managed URLs so external images are never touched.
 */
export function extractFileKeyFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(/^\/api\/files\/(.+)$/);
    if (!match || !match[1]) return null;
    const key = decodeURIComponent(match[1]);
    const folder = key.split("/")[0] ?? "";
    if (!ALLOWED_FOLDERS.includes(folder)) return null;
    return key;
  } catch {
    return null;
  }
}

/**
 * Deletes a managed upload from the bucket. Non-blocking: returns false
 * (and logs) instead of throwing so callers can finish DB deletes.
 */
export async function deleteFileFromUrl(url: string | null | undefined): Promise<boolean> {
  const key = extractFileKeyFromUrl(url);
  if (!key) return false;
  try {
    await s3.send(new DeleteObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key }));
    return true;
  } catch (error) {
    console.error(`Failed to delete S3 object "${key}":`, error);
    return false;
  }
}

export { s3 };
