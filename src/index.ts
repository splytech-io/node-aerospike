const AS: Aerospike.Aerospike = require('aerospike');

export namespace Aerospike {
  AS.setDefaultLogging({
    level: AS.log.WARN,
    file: 2,
  });

  export interface Host {
    addr: string;
    port?: number;
  }

  export interface LogConfig {
    level?: number;
    file?: number;
  }

  export interface Config {
    clusterName?: string;
    connTimeoutMs?: number;
    maxConnsPerNode?: number;
    modlua?: {
      systemPath?: string;
      userPath?: string;
    };

    sharedMemory?: {
      enable?: boolean;
      key?: number;
      maxNodes?: number;
      maxNamespaces?: number;
      takeoverThresholdSeconds?: number;
    };

    tenderInterval?: number;

    hosts?: string | Host[];
    user?: string;
    password?: string;
    policies?: object;
    log?: LogConfig;
  }

  export interface Key {
    ns: string;
    set: string;
    key: string;
    digest: Buffer;
  }

  export interface Operation {
    op: number;
    bin: string;
    value: string | number;
  }

  export interface Metadata {
    ttl?: number;
  }

  export interface BasePolicy {
    maxRetries?: number;
    socketTimeout?: number;
    totalTimeout?: number;
  }

  export interface WritePolicy extends BasePolicy {
    commitLevel?: number;
    compressionThreshold?: number;
    durableDelete?: boolean;
    exists?: number;
    gen?: number;
    key?: number;
  }

  export interface ReadPolicy extends BasePolicy {
    key?: number;
    linearizeRead?: boolean;
    replica?: number;
  }

  export interface OperatePolicy extends BasePolicy {
    commitLevel?: number;
    consistencyLevel?: number;
    durableDelete?: boolean;
    exists?: number;
    gen?: number;
    key?: number;
    linearizeRead?: boolean;
    replica?: number;
  }

  export interface InfoPolicy {
    checkBounds?: boolean;
    sendAsIs?: boolean;
    totalTimeout?: number;
  }

  export interface IndexOptions {
    ns: string;
    set: string;
    bin: string;
    index: string;
    type?: number;
    datatype: number;
  }

  export interface Aerospike {
    setDefaultLogging: (config: LogConfig) => void;
    Key: new (ns: string, set: string, key: string) => Key;

    log: {
      OFF: number;
      ERROR: number;
      WARN: number;
      INFO: number;
      DEBUG: number;
      DETAIL: number;
    };

    status: {
      getMessage: (code: number) => string;

      ERR_ASYNC_QUEUE_FULL: number;
      ERR_CONNECTION: number;
      ERR_INVALID_NODE: number;
      ERR_NO_MORE_CONNECTIONS: number;
      ERR_ASYNC_CONNECTION: number;
      ERR_CLIENT_ABORT: number;
      ERR_INVALID_HOST: number;
      ERR_PARAM: number;
      ERR_CLIENT: number;
      ERR_SERVER: number;
      ERR_RECORD_NOT_FOUND: number;
      ERR_RECORD_GENERATION: number;
      ERR_REQUEST_INVALID: number;
      ERR_RECORD_EXISTS: number;
      ERR_BIN_EXISTS: number;
      ERR_CLUSTER_CHANGE: number;
      ERR_SERVER_FULL: number;
      ERR_TIMEOUT: number;
      ERR_ALWAYS_FORBIDDEN: number;
      ERR_CLUSTER: number;
      ERR_BIN_INCOMPATIBLE_TYPE: number;
      ERR_RECORD_TOO_BIG: number;
      ERR_RECORD_BUSY: number;
      ERR_SCAN_ABORTED: number;
      ERR_UNSUPPORTED_FEATURE: number;
      ERR_BIN_NOT_FOUND: number;
      ERR_DEVICE_OVERLOAD: number;
      ERR_RECORD_KEY_MISMATCH: number;
      ERR_NAMESPACE_NOT_FOUND: number;
      ERR_BIN_NAME: number;
      ERR_FAIL_FORBIDDEN: number;
      ERR_FAIL_ELEMENT_NOT_FOUND: number;
      ERR_FAIL_ELEMENT_EXISTS: number;
      ERR_FAIL_ENTERPRISE_ONLY: number;
      ERR_UDF: number;
      ERR_BATCH_DISABLED: number;
      ERR_BATCH_MAX_REQUESTS_EXCEEDED: number;
      ERR_BATCH_QUEUES_FULL: number;
      ERR_GEO_INVALID_GEOJSON: number;
      ERR_INDEX_FOUND: number;
      ERR_INDEX_NOT_FOUND: number;
      ERR_INDEX_OOM: number;
      ERR_INDEX_NOT_READABLE: number;
      ERR_INDEX: number;
      ERR_INDEX_NAME_MAXLEN: number;
      ERR_INDEX_MAXCOUNT: number;
      ERR_QUERY_ABORTED: number;
      ERR_QUERY_QUEUE_FULL: number;
      ERR_QUERY_TIMEOUT: number;
      ERR_QUERY: number;
      ERR_UDF_NOT_FOUND: number;
      ERR_LUA_FILE_NOT_FOUND: number;
    };

    connect: (config?: Config) => Promise<AerospikeClient>;

    policy: {
      // ApplyPolicy: () => any;
      // BatchPolicy: () => any;
      // CommandQueuePolicy: () => any;
      // MapPolicy: () => any;
      // OperatePolicy: () => any;
      // QueryPolicy: () => any;
      // ReadPolicy: () => any;
      // RemovePolicy: () => any;
      // ScanPolicy: () => any;
      // WritePolicy: new (props?: WritePolicy) => WritePolicy;

      exists: {
        IGNORE: number;
        CREATE: number;
        UPDATE: number;
        REPLACE: number;
        CREATE_OR_REPLACE: number;
      };

      key: {
        SEND: number;
        DIGEST: number;
      };

      gen: {
        IGNORE: number;
        EQ: number;
        GT: number;
      };

      commitLevel: {
        ALL: number;
        MASTER: number;
      };

      consistencyLevel: {
        ONE: number;
        ALL: number;
      };
    };
    operations: {
      add: (bin: string, value: number) => Operation;
      incr: (bin: string, value: number) => Operation;
      read: (bin: string) => Operation;
      write: (bin: string, value: string | number | Buffer) => Operation;
      prepend: (bin: string, value: string | Buffer) => Operation;
      append: (bin: string, value: string | Buffer) => Operation;
      removeByKey: (bin: string, value: string) => Operation;
      touch: (ttl?: number) => Operation;
    };
  }

  export interface AerospikeClient {
    /**
     * Adds a seed host to the cluster.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#addSeedHost__anchor
     *
     * @param {string} hostname
     * @param {number} port defaults to 3000
     */
    addSeedHost: (hostname: string, port?: number) => void;


    /**
     * Applies a User Defined Function (UDF) on a record in the database.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#apply__anchor
     *
     * @param {Aerospike.Key} key
     * @param {object} udfArgs
     * @param policy
     * @returns {Promise<any>}
     */
    apply: (key: Key, udfArgs: object, policy: any) => Promise<any>;

    /**
     * Checks the existence of a batch of records from the database cluster.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#batchExists__anchor
     *
     * @param {Aerospike.Key[]} keys
     * @param policy
     * @returns {Promise<BatchResult<T>[]>}
     */
    batchExists: <T>(keys: Key[], policy?: any) => Promise<BatchResult<T>[]>;

    /**
     * Reads a batch of records from the database cluster.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#batchGet__anchor
     *
     * @param {Aerospike.Key[]} keys
     * @param policy
     * @returns {Promise<Aerospike.BatchResult<T>[]>}
     */
    batchGet: <T>(keys: Key[], policy?: any) => Promise<BatchResult<T>[]>;

    /**
     * Read multiple records for specified batch keys in one batch call.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#batchRead__anchor
     *
     * @param {Aerospike.BatchReadRecord[]} records
     * @param policy
     * @returns {Promise<Aerospike.BatchResult<T>[]>}
     */
    batchRead: <T>(records: BatchReadRecord[], policy?: any) => Promise<BatchResult<T>[]>;

    /**
     * Reads a subset of bins for a batch of records from the database cluster.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#batchSelect__anchor
     *
     * @param {Aerospike.Key[]} keys
     * @param {string[]} bins
     * @param policy
     * @returns {Promise<Aerospike.BatchResult<T>[]>}
     */
    batchSelect: <T>(keys: Key[], bins: string[], policy?: any) => Promise<BatchResult<T>[]>;

    /**
     * Closes the client connection to the cluster.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#close__anchor
     *
     * @param {boolean} releaseEventLoop
     */
    close: (releaseEventLoop?: boolean) => void;

    /**
     * Establishes the connection to the cluster.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#connect__anchor
     *
     * @returns {Promise<Aerospike.Aerospike>}
     */
    connect: () => Promise<Aerospike>;

    /**
     * Creates a secondary index.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#createIndex__anchor
     *
     * @param {Aerospike.IndexOptions} options
     * @param policy
     * @returns {Promise<void>}
     */
    createIndex: (options: IndexOptions, policy?: any) => Promise<void>;

    /**
     * Checks the existance of a record in the database cluster.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#exists__anchor
     *
     * @param {Aerospike.Key} key
     * @param policy
     * @returns {Promise<boolean>}
     */
    exists: (key: Key, policy?: ReadPolicy) => Promise<boolean>;

    /**
     * Using the key provided, reads a record from the database cluster.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#get__anchor
     *
     * @param {Aerospike.Key} key
     * @param policy
     * @returns {Promise<Aerospike.Record<T>>}
     */
    get: <T>(key: Key, policy?: ReadPolicy) => Promise<Record<T>>;

    /**
     * Alias for Connection#add.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#incr__anchor
     *
     * @param {Aerospike.Key} key
     * @param {T} bins
     * @param {Aerospike.Metadata} metadata
     * @param policy
     * @returns {Promise<any>}
     */
    incr: <T>(key: Key, bins: T, metadata?: Metadata, policy?: WritePolicy) => Promise<any>;

    /**
     * Removes the specified index.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#indexRemove__anchor
     *
     * @param {string} namespace
     * @param {string} index
     * @param policy
     * @returns {Promise<void>}
     */
    indexRemove: (namespace: string, index: string, policy: any) => Promise<void>;

    /**
     * Sends an info query to a specific cluster node.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#info__anchor
     *
     * @param {string} request
     * @param {Aerospike.Host} host
     * @param policy
     * @returns {Promise<any>}
     */
    info: (request: string, host: Host, policy?: any) => Promise<any>;

    /**
     * Sends an info query to all nodes in the cluster and collects the results.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#infoAll__anchor
     *
     * @param {string} request
     * @param policy
     * @returns {Promise<any>}
     */
    infoAll: (request?: string, policy?: any) => Promise<any>;

    /**
     * Sends an info query to a single, randomly selected cluster node.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#infoAny__anchor
     *
     * @param {string} request
     * @param policy
     * @returns {Promise<any>}
     */
    infoAny: (request?: string, policy?: any) => Promise<any>;

    /**
     * Is client connected to any server nodes.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#isConnected__anchor
     *
     * @param {boolean} checkTenderErrors
     * @returns {Promise<boolean>}
     */
    isConnected: (checkTenderErrors?: boolean) => Promise<boolean>;

    /**
     * Performs multiple operations on a single record.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#operate__anchor
     *
     * @param {Aerospike.Key} key
     * @param {Aerospike.Operation[]} operations
     * @param {Aerospike.Metadata} metadata
     * @param {Aerospike.OperatePolicy} policy
     * @returns {Promise<any>}
     */
    operate: <T>(key: Key, operations: Operation[], metadata?: Metadata, policy?: OperatePolicy) => Promise<Record<T>>;

    /**
     * Writes a record to the database cluster.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#put__anchor
     *
     * @param {Aerospike.Key} key
     * @param {T} value
     * @param {Aerospike.Metadata} meta
     * @param {Aerospike.WritePolicy} policy
     * @returns {Promise<boolean>}
     */
    put: <T>(key: Key, value: T, meta?: Metadata, policy?: WritePolicy) => Promise<boolean>;

    /**
     * Creates a new Query instance, which is used to define query in the database.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#query__anchor
     *
     * @param {string} ns
     * @param {string} set
     * @param options
     * @returns {any}
     */
    query: (ns: string, set: string, options?: any) => any;

    /**
     * Removes a record with the specified key from the database cluster.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#remove__anchor
     *
     * @param {Aerospike.Key} key
     * @param policy
     * @returns {Promise<void>}
     */
    remove: (key: Key, policy?: any) => Promise<void>;

    /**
     * Removes a seed host from the cluster.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#removeSeedHost__anchor
     *
     * @param {string} hostname
     * @param {number} port
     */
    removeSeedHost: (hostname: string, port?: number) => void;

    /**
     * Creates a new Scan instance in order to execute a database scan using the Scan API.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#scan__anchor
     *
     * @param {string} ns
     * @param {string} set
     * @param options
     * @returns {any}
     */
    scan: (ns: string, set: string, options: any) => any;

    /**
     * Retrieves selected bins for a record of given key from the database cluster.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#select__anchor
     *
     * @param {Aerospike.Key} key
     * @param {string[]} bins
     * @param {Aerospike.ReadPolicy} policy
     * @returns {Promise<Aerospike.Record<T>>}
     */
    select: <T>(key: Key, bins: string[], policy?: ReadPolicy) => Promise<Record<T>>;

    /**
     * Removes records in specified namespace/set efficiently.
     * https://www.aerospike.com/apidocs/nodejs/Client.html#truncate__anchor
     *
     * @param {string} ns
     * @param {string} set
     * @param {number} beforeNanos
     * @param {Aerospike.InfoPolicy} policy
     * @returns {Promise<void>}
     */
    truncate: (ns: string, set: string, beforeNanos: number, policy?: InfoPolicy) => Promise<void>;
    Key: new (ns: string, set: string, key: string) => Key;
  }

  export interface BatchReadRecord {
    key: Key;
    bins?: string[];
    read_all_bins?: boolean;
  }

  export interface Record<T> {
    key: Key;
    bins: T;
    ttl: number;
    gen: number;
  }

  export interface BatchResult<T> {
    status: number;
    record: Record<T>;
  }

  export interface SetOptions {
    namespace: string;
    set: string;
  }

  export class Set<T> {
    private options: SetOptions;
    private client: Connection;

    constructor(client: Connection, options: SetOptions) {
      this.client = client;
      this.options = options;
    }

    /**
     *
     * @param {string} key
     * @param policy
     * @returns {Promise<Aerospike.Record<T>>}
     */
    async get(key: string, policy?: ReadPolicy): Promise<Record<T>> {
      return this.client.getClient().get<T>(
        new Aerospike.Key(this.options.namespace, this.options.set, key),
        policy,
      );
    }

    /**
     *
     * @param {string} key
     * @param {T} value
     * @param {Aerospike.Metadata} meta
     * @param {Aerospike.WritePolicy} policy
     * @returns {Promise<Boolean>}
     */
    async put(key: string, value: T, meta?: Metadata, policy?: WritePolicy): Promise<Boolean> {
      return this.client.getClient().put<T>(
        new Aerospike.Key(this.options.namespace, this.options.set, key),
        value,
        meta,
        policy,
      );
    }

    /**
     *
     * @param {string} key
     * @param {string[]} bins
     * @param {Aerospike.ReadPolicy} policy
     * @returns {Promise<Aerospike.Record<T>>}
     */
    async select(key: string, bins: string[], policy?: ReadPolicy): Promise<Record<T>> {
      return this.client.getClient().select<T>(
        new Aerospike.Key(this.options.namespace, this.options.set, key),
        bins,
        policy,
      );
    }

    /**
     *
     * @param {string} key
     * @param {Aerospike.ReadPolicy} policy
     * @returns {Promise<boolean>}
     */
    async exists(key: string, policy?: ReadPolicy): Promise<boolean> {
      return this.client.getClient().exists(
        new Aerospike.Key(this.options.namespace, this.options.set, key),
        policy,
      );
    }

    /**
     *
     * @param {number} beforeNanos
     * @param {Aerospike.InfoPolicy} policy
     * @returns {Promise<void>}
     */
    async truncate(beforeNanos?: number, policy?: InfoPolicy): Promise<void> {
      return this.client.getClient().truncate(
        this.options.namespace,
        this.options.set,
        beforeNanos || 0,
        policy,
      );
    }

    /**
     *
     * @param {string} key
     * @param {Aerospike.Operation[]} operations
     * @param {Aerospike.Metadata} metadata
     * @param {Aerospike.OperatePolicy} policy
     * @returns {Promise<Aerospike.Record<T>>}
     */
    async operate(
      key: string,
      operations: Operation[],
      metadata?: Metadata,
      policy?: OperatePolicy,
    ): Promise<Record<T>> {
      return this.client.getClient().operate<T>(
        new Aerospike.Key(this.options.namespace, this.options.set, key),
        operations,
        metadata,
        policy,
      );
    }
  }

  export class Connection {
    private client?: AerospikeClient;

    /**
     *
     * @param {Aerospike.Config} config
     * @returns {Promise<void>}
     */
    async open(config?: Config) {
      await AS.connect(config).then((client: AerospikeClient) => {
        this.client = client;
      });
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async close() {
      if (!this.client) {
        throw new Error('not connected');
      }

      await this.client.close(false);
    }

    /**
     *
     * @returns {Aerospike.AerospikeClient}
     */
    getClient(): AerospikeClient {
      if (!this.client) {
        throw new Error('not connected');
      }

      return this.client;
    }

    /**
     *
     * @param {Aerospike.SetOptions} options
     * @returns {Aerospike.Set<T>}
     */
    createSet<T>(options: SetOptions): Set<T> {
      return new Set<T>(this, options);
    }
  }

  export const Key = AS.Key;
  export const Status = AS.status;
  export const Operations = AS.operations;
  export const Policy = AS.policy;
  export const connection = new Connection();
}
