const { Client } = require('@elastic/elasticsearch');
const moment = require('moment');

export const elastic = class {
  public elastic: any;
  protected index: string;
  private readonly analyzer: string;
  protected fields: string[];

  constructor() {
    this.index = '';
    this.elastic = new Client({ node: 'http://localhost:9200' });
    this.analyzer = 'latin';
    this.fields = [];
  }

  async insert(data: any) {
    const query = [];
    const params = { index: {} };
    if (data._id) {
      // @ts-ignore
      params.index._id = data._id;
      delete data._id;
    }

    data.date = moment().toISOString();
    query.push(params);
    query.push(data);
    const { body: bulkResponse } = await this.elastic.bulk({ index: this.index, body: query })
      .catch((err: any) => console.error('err', JSON.stringify(err)));
    if (bulkResponse.errors) {
      console.error(JSON.stringify(bulkResponse.items));
    }
  }

  async exec(ids: String[], script: String, params: any) {
    if (!ids || !ids.length) {
      throw new SyntaxError('ids is required');
    }

    return this.elastic.updateByQuery({
      index: this.index,
      body: {
        query: {
          terms: {
            _id: ids,
          },
        },
        script: {
          params,
          source: script,
          lang: 'painless',
        },
      },
    });
  }

  async search(search: any, city: String) {

    if (!search) {
      throw new SyntaxError('str is required');
    }

    // tslint:disable-next-line:prefer-template
    const searchStr = search.replace(/[^\s\da-zа-яё]/gi, '')
      .split(/\s+/g)
      .filter(Boolean)
      .join('~ ') + '~';

    const query =
      {
        query: {
          query_string: {
            fields: this.fields,
            query: searchStr,
            analyzer: this.analyzer,
            fuzziness: 3,
            fuzzy_max_expansions: 10,
          },
        },
        aggs: {
          id: {
            terms: {
              field: '_id',
              size: 10,
              order: {
                users_count: 'desc',
              },
            },
            aggs: {
              users_count: {
                value_count: {
                  field: `users.${city}.keyword`,
                },
              },
            },
          },
        },
      };
    const { body: resp } = await this.elastic.search({ index: this.index, body: query })
      .catch((err: any) => console.error('err', JSON.stringify(err)));

    return { hits: resp.hits.hits, aggs: resp.aggregations };

  }
};
