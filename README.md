### 1.0.0
1. 增加kafka 消费组流模式，插件配置如下

/**
 * kafka connect
 */
exports.kafkaconnect = {
  package: 'wood-kafka/connect',
  enable: true,
  config: {
    options: {
      kafkaHost: '10.0.2.39:6667',
      groupId: 'oper-center-group',
      // Auto commit config
      autoCommit: true,
      highWaterMark: 10,
      autoCommitIntervalMs: 5000,
      // Fetch message config
      fetchMaxWaitMs: 100,
      paused: false,
      maxNumSegments: 1000,
      fetchMinBytes: 1,
      fetchMaxBytes: 1024 * 1024,
      maxTickMessages: 1000,
      fromOffset: 'latest',
      outOfRangeOffset: 'earliest',
      sessionTimeout: 30000,
      retries: 10,
      retryFactor: 1.8,
      retryMinTimeout: 1000,
      commitOffsetsOnFirstJoin: true,
      connectOnReady: true,
      migrateHLC: false,
      onRebalance: null,
      topicPartitionCheckInterval: 30000,
      protocol: ['roundrobin'],
      encoding: 'utf8'
    },
    "topics": ['test_topic_01']
  }
};

/**
 *  kafka
 */
exports.kafka = {
  package: 'wood-kafka',
  enable: true,
};