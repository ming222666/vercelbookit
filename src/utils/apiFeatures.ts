import { Query } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
type Q = Query<any[], any, {}, any>;

export default class APIFeatures {
  query: Q;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryStr: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(query: Q, queryStr: { [key: string]: any }) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search(): APIFeatures {
    const location = this.queryStr.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: 'i',
          },
        }
      : {};

    this.query = this.query.find({ ...location });
    return this;
  }

  filter(): APIFeatures {
    const queryStrCopy = { ...this.queryStr };

    // Remove fields from queryStr
    const removeFields = ['location', 'page'];

    removeFields.forEach((el) => delete queryStrCopy[el]);

    this.query = this.query.find({ ...queryStrCopy });
    return this;
  }

  pagination(resPerPage: number): APIFeatures {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}
