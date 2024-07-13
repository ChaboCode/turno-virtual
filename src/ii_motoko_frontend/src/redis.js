import { createClient, SchemaFieldTypes } from "redis";

const client = createClient()

client.on('error', err => console.log('Redis Client error', err))

await client.connect();

const schema = {
    '$.maxTime': {
        type: SchemaFieldTypes.NUMERIC,
        SORTABLE: true,
        AS: 'maxTime'
    }
}

try {
    await client.ft.create('idx:turnos', schema, {
        ON: 'JSON',
        PREFIX: 'turnos:'
    })
} catch (e) {
    console.log(e)
}

const res = await client.json.set(`turnos:1`, '$', {
    maxTime: 4
})

console.log(res)

let result = await client.ft.search('idx:turnos', '*', {})
console.log(JSON.stringify(result, null, 2))