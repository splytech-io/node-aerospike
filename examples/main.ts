import { Aerospike } from '../index';

const connection = new Aerospike.Connection();

interface Schema {
  hits: number;
}

const User = connection.createSet<Schema>({
  namespace: 'cache',
  set: 'test',
});

connection.open().then(async () => {
  await User.put('test', {
    hits: 0,
  });

  await User.operate('test', [
    Aerospike.Operations.incr('hits', 1),
  ]);

  await User.get('test').then((r) => {
    console.log(r.bins.hits);
  });

  await connection.close();
});
