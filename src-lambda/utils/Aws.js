import S3 from "aws-sdk/clients/s3";

export class S3Client {
  client = new S3({
    accessKeyId: process.env.TM_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.TM_AWS_ACCESS_KEY_SECRET,
  });

  async put(request) {
    return new Promise((resolve, reject) => {
      this.client.putObject(
        { ...request, ContentType: "application/json; charset=utf-8" },
        (error, data) => {
          if (error) {
            return reject(error);
          }

          return resolve(data);
        }
      );
    });
  }

  async list(request) {
    return new Promise((resolve, reject) => {
      this.client.listObjectsV2(request, (error, data) => {
        if (error) {
          return reject(error);
        }

        return resolve(data);
      });
    });
  }

  async get(request) {
    return new Promise((resolve, reject) => {
      this.client.getObject(request, (error, data) => {
        if (error) {
          return reject(error);
        }

        return resolve(data.Body.toString());
      });
    });
  }
}

export default S3Client;
