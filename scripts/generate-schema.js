var jsonObject = {
	"name": "73 Oceana Crescent Purchase",
	"startingAmount": 16297.0,
	"amountPaid": 0.0,
	"amountPending": 0.0,
	"amountRemaining": 19297.0
}
var GenerateSchema = require('generate-schema')
var schema = GenerateSchema.json('Account', jsonObject);

console.log(JSON.stringify(schema));