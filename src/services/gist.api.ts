import { request } from "@@/exports";

export default class GistApi {
  baseUrl: string = `https://api.github.com`;

  fileName: string = "BoxJS-RemoteSub.json";
  description: string = "BoxJS-RemoteSub";

  headers: Record<string, string>;
  gist: { token: string; username: string };

  constructor(params: any) {
    this.gist = params;
    this.headers = {
      accept: `application/vnd.github+json`,
      Authorization: `token ${params.token}`,
    };
  }

  get = () =>
    request(`${this.baseUrl}/users/${this.gist.username}/gists`, {
      headers: this.headers,
    }).then((response: Gist.Item[]) => {
      const result = response.find((item) => {
        return item.description === this.description;
      });
      return { data: result };
    });

  upload = (params: Record<string, any>) =>
    request(`${this.baseUrl}/gists`, {
      headers: this.headers,
      method: "POST",
      data: {
        files: {
          [this.fileName]: {
            content: JSON.stringify(params, null, `\t`),
          },
        },
        description: this.description,
        public: false,
      },
    });

  update = (id: string, params: Record<string, any>) =>
    request(`${this.baseUrl}/gists/${id}`, {
      headers: this.headers,
      method: "PATCH",
      data: {
        files: {
          [this.fileName]: {
            content: JSON.stringify(params, null, `\t`),
          },
        },
        description: this.description,
        public: false,
      },
    });
}
