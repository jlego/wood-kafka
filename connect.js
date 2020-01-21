/**
 * Wood Plugin Module.
 * Kafka操作库
 * by huangyong on 2019-08-31
 */
const Kafka = require('./src/kafka');

module.exports = async (app = {}, config = {}) => {
  await Kafka.connect(config);
  return app;
}
