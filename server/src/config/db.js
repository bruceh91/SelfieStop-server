import mysql from 'mysql';

let pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

function executeQuery(sql, args = []) {
    return getConnection()
    .then((connection) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, args, (err, result) => {
                connection.release();
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });
}

function callProcedure(procedureName, args = []) {
    let placeholders = generatePlaceholders(args);
    let callString = `CALL ${procedureName}(${placeholders});`; // CALL GetChirps();, or CALL InsertChirp(?,?,?);
    return executeQuery(callString, args);
}

function rows(procedureName, args = []) {
    return callProcedure(procedureName, args)
    .then((resultsets) => {
        return resultsets[0];
    });
}

function row(procedureName, args = []) {
    return callProcedure(procedureName, args)
    .then((resultsets) => {
        return resultsets[0][0];
    });
}

function empty(procedureName, args = []) {
    return callProcedure(procedureName, args)
    .then(() => {
        return;
    });
}

// function generatePlaceholders(args = []) {
//     let placeholders = '';
//     if (args.length > 0) {
//         for (let i = 0; i < args.length; i++) {
//             console.log(args[i]);
//             if (i === args.length - 1) { // if we are on the last argument in the array
//                 placeholders += `'${args[i]}'`;
//             } else {
//                 placeholders += `'${args[i]}',`;
//             }
//         }
//     }
//     return placeholders;
// }

function generatePlaceholders(args = []) {
    let placeholders = '';
    if (args.length > 0) {
        for (let i = 0; i < args.length; i++) {
            if (i === args.length - 1) { // if we are on the last argument in the array
                placeholders += '?';
            } else {
                placeholders += '?,';
            }
        }
    }
    return placeholders;
}

function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('db.js getConnection reject')
                reject(err);
            } else {
                console.log('db.js getConnection resolve')
                // console.log(connection);
                resolve(connection);
            }
        });
    });
}

export { row, rows, empty, executeQuery, generatePlaceholders };