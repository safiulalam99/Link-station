locals {
  project_id = "things-367718"
  timestamp  = formatdate("YYMMDDhhmmss", timestamp())
}

provider "google" {
  project     = local.project_id
  region      = "us-central1"
}

data "archive_file" "source" {
  type        = "zip"
  source_dir  = "../src"
  output_path = "/tmp/git-function-${local.timestamp}.zip"
}


resource "google_storage_bucket" "bucket" {
  name     = "${local.project_id}-functions"
  location = "US"
}

resource "google_storage_bucket_object" "archive" {
  name   = "terraform-function.zip#${data.archive_file.source.output_md5}"
  bucket = google_storage_bucket.bucket.name
  source = data.archive_file.source.output_path
}

resource "google_cloudfunctions_function" "function" {
  name    = "terraform-function"
  runtime = "nodejs16"

  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.bucket.name
  source_archive_object = google_storage_bucket_object.archive.name
  trigger_http          = true
  entry_point           = "main"
}

resource "google_cloudfunctions_function_iam_member" "invoker" {
  project        = google_cloudfunctions_function.function.project
  region         = google_cloudfunctions_function.function.region
  cloud_function = google_cloudfunctions_function.function.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}

output "function_url" {
  value = google_cloudfunctions_function.function.https_trigger_url
}