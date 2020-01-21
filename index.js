/**
 * Wood Plugin Module.
 * kafka 操作库
 * by huangyong on 2019-08-31
 */
const Kafka = require('./src/kafka');

module.exports = (app = {}, config = {}) => {
  app.Kafka = Kafka;
  if (app.addAppProp) app.addAppProp('Kafka', app.Kafka);
  return app;
}
