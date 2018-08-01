import { Aerospike } from './index';

describe('index', async () => {
  it('should connect', async () => {
    await Aerospike.connection.open({
      hosts: [{
        addr: '127.0.0.1',
        port: 3000,
      }],
    });
  });
});
