const kafka = require('kafka-node');
const Offset = kafka.Offset;
const ConsumerGroupStream = kafka.ConsumerGroupStream;
const { Log } = WOOD;
let connect = null;
let kafkaConfig = null;

let promisify = function (method, ctx) {
  return function () {
    // 获取method调用的需要参数
    let args = Array.prototype.slice.call(arguments, 0);
    // use runtime this if ctx not provided
    ctx = ctx || this;
    //返回一个新的Promise对象
    return new Promise(function (resolve, reject) {
      // 除了函数传入的参数以外还需要一个callback函数来供异步方法调用
      let callback = function () {
        return function (err, result) {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        };
      }
      args.push(callback());
      // 调用method
      method.apply(ctx, args);
    });
  };
};

class Kafka {
  constructor() {
  }

  onMessage(handle) {
    connect.on('data', handle);
  }

  getStream() {
    return connect;
  }

  onClose() {
    Log.info("kafka closed!");
  }

  async fetchLastOffsets() {
    let offset = new Offset(connect);
    let fetchLatestOffsets = promisify(offset.fetchLatestOffsets, offset);
    let result = await fetchLatestOffsets(kafkaConfig.topics);
    return result;
  }

  async fetchEarlistOffsets() {
    let offset = new Offset(connect);
    let fetchEarlistOffsets = promisify(offset.fetchEarlistOffsets, offset);
    let result = await fetchEarlistOffsets(kafkaConfig.topics);
    return result;
  }

  // topics is {topic: 'test', partition: 0} structure
  async fetchCommits() {
    let offset = new Offset(connect);
    let fetchCommits = promisify(offset.fetchCommits, offset);
    let result = await fetchCommits(kafkaConfig.options.groupId, topics);
    return result;
  }

  // 如果取消自动提交，需要手动提交确认
  async commit(message, force) {
    let commit = promisify(connect.commit, connect);
    let result = await commit(message, force);
    return result;
  }

  static async connect(config) {
    try {
      if (!connect) {
        connect = new ConsumerGroupStream(config.options, config.topics);
        connect.on('error', (error) => {
          Log.error(`kafka error ${JSON.stringify(error)}`);
        });
        connect.on('ready', () => { Log.info("kafka all brokers are discoverd"); });
        connect.on('connect', () => { Log.info("kafka connect success!"); });
        kafkaConfig = config;
      }
    } catch (e) {
      Log.error(e);
    }
  }
}

module.exports = Kafka;