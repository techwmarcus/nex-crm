terraform {

  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "6.35.1"
    }
    tls = {
      source = "hashicorp/tls"
    }
  }
  backend "s3" {
    bucket = "amarri-tf-state"
    key = "nex-crm.tfstate"
    region = "us-west-1"
    
  }
}

provider "aws" {
  region = "us-west-1"
}