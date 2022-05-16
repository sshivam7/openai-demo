// ENUM for status of API requests
class ResultStatus {
  static LOADING = new ResultStatus('loading');
  static ERROR = new ResultStatus('error');
  static SUCCESS = new ResultStatus('success');
  static IDLE = new ResultStatus('idle');

  constructor(name) {
    this.name = name;
  }

  toString() {
    return `ResultStatus.${this.name}`;
  }
}

export default ResultStatus;
