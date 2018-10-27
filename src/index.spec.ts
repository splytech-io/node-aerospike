import { Aerospike } from './index';
import { expect } from 'chai';

describe('index', async () => {
  const db = Aerospike.connection.createSet<any>({
    namespace: 'cache',
    set: 'test',
  });

  beforeEach(async () => {
    await db.remove('test').catch(() => void 0);
  });

  before(async () => {
    await Aerospike.connection.open({
      hosts: [{
        addr: '127.0.0.1',
        port: 3000,
      }],
    });
  });

  after(async () => {
    await Aerospike.connection.close();
  });

  describe('Operate', async () => {
    describe('List', async () => {
      it('should append item to the list', async () => {
        const r = await db.operate('test', [
          Aerospike.Lists.append('list', 'orange'),
          Aerospike.Operations.read('list'),
        ]);

        expect(r.bins)
          .to.have.property('list')
          .which.deep.equals(['orange']);
      });
      it('should append multiple item to the list', async () => {
        const r = await db.operate('test', [
          Aerospike.Lists.appendItems('list', ['orange', 'apples']),
          Aerospike.Operations.read('list'),
        ]);

        expect(r.bins)
          .to.have.property('list')
          .which.deep.equals(['orange', 'apples']);
      });
    });
  });
});
