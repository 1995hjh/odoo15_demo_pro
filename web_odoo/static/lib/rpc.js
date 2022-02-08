
class odooCorsRpc {
    constructor() {
        this.request_counts = 0;
        this.host = undefined;
        this.db = undefined;
        this.account_code = undefined;
    }

    setHost(host, db, account_code) {
        this.host = host;
        this.db = db;
        this.account_code = account_code;
    }

    rpcSendRequest(url, json_data) {

        function set_cookie(name, value, ttl) {
            ttl = ttl || 24 * 60 * 60 * 365;
            document.cookie = [
                name + '=' + value,
                'path=/',
                'max-age=' + ttl,
                'expires=' + new Date(new Date().getTime() + ttl * 1000).toGMTString()
            ].join(';');
        }

        return new Promise((resolve, reject) => {
            // create a new asynchronous request
            let request = new XMLHttpRequest();

            // open the request
            request.open("POST", this.host + url, true);

            // Define the content type : JSON-RPC -> application/json
            request.setRequestHeader(
                "Content-Type",
                "application/json; charset=UTF-8"
            );

            // set the response type
            request.responseType = "json";

            // set the mime type
            if (request.overrideMimeType)
                request.overrideMimeType("application/json");

            // append session_id
            request.withCredentials = false;

            request.onload = () => {
                if (request.status === 200) {
                    let data = request.response;
                    if (data.error) {
                        reject(data.error);
                    } else if (!('result' in data)) {
                        reject(Error("no result in data received"));
                    } else if (typeof data.result === 'object' && 'records' in data.result) {
                        resolve(data.result.records);
                    } else {
                        resolve(data.result);
                    }
                } else {
                    reject(Error("Fail to get " + url));
                }
            };

            request.send(JSON.stringify(json_data));

            this.request_counts += 1;
        });
    }

    login(db, login, password) {
        return new Promise((resolve, reject) => {
            // construct the data
            let json_data = {
                jsonrpc: "2.0",
                method: "call",
                params: { db: db, login: login, password: password },
                id: "r" + this.request_counts
            };
            // send the request
            this.rpcSendRequest("/web/session/authenticate", json_data).then(
                rst => {
                    if (rst.uid !== false) {
                        console.log('login success');
                        // this.session_id = rst.session_id;
                        resolve(rst);
                    } else {
                        reject(Error("Fail to login in database"));
                    }
                },
                error => {
                    reject(error);
                }
            );
        });
    }


    odooRpcAuth(code, route) {
        return new Promise((resolve, reject) => {
            if (!code || code === "") {
                reject(Error("the code param is invalidate"));
            }

            let xhr = new XMLHttpRequest();
            xhr.responseType = "json";

            let url = this.host + route + "?code=" + code + "&db=" + this.db + "&account_code=" + this.account_code;
            xhr.open("GET", url, true);
            xhr.onload = rst => {
                if (xhr.status === 200) {
                    // this.session_id = xhr.response.session_id;
                    resolve(xhr.response);
                } else {
                    reject(Error("Fail to login in database"));
                }
            };
            xhr.send(null);
        });
    }

    //
    searchRead(model, params) {
        let iParams = params || {};
        iParams.model = model;
        let json_data = {
            jsonrpc: "2.0",
            method: "call",
            params: iParams,
            id: "r" + this.request_counts
        };
        return this.rpcSendRequest("/web/dataset/search_read", json_data);
    }

    call(model, method, args, params) {
        let _self = this;
        let json_data = {
            jsonrpc: "2.0",
            params: {
                model: model,
                method: method,
                args: args || [],
                kwargs: params || {}
            },
            id: "r" + _self.request_counts
        };

        return this.rpcSendRequest("/web/dataset/call_kw", json_data);
    }

    // rpc.create('repair_manage_for_xian.lines', {name: 'crax'}).then((data)=>{})
    create(model, datas) {
        return this.call(model, "create", datas);
    }

    update(model, id, data) {
        return this.call(model, "write", [id, data]);
    }

    del(model, ids) {
        return this.call(model, "unlink", [ids]);
    }
}

let rpc = new odooCorsRpc();