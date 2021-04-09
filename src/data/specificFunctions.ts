import { NativeFunction } from "../types/nativeFunction";

export const specificFunctions: NativeFunction[] = [
	{
		name: "CreateThread",
		description:
		"This allows you to create a new thread. All code inside the handler will be executed asynchronously",
		results: "",
		params: [{ name: "threadFunction", type: "function", description: "The thread handler function" }],
	},
	{
		name: "Wait",
		description: 'This will "pause" the execution of the current thread for miliseconds amount of time',
		results: "",
		params: [
			{ name: "msec", type: "number", description: "The amount of milliseconds to pause the current thread" },
		],
	},
	{
		name: "Trace",
		description:
			'Outputs the passed message to any trace listeners, including the console output and the log file. Does not add a newline by itself, therefore suffix a message with `"\\n"`',
		results: "",
		params: [
			{
				name: "message",
				type: "string",
			},
		],
	},
	{
		name: "quat",
		description: "Creates a new quaternion",
		results: "",
		params: [
			{ name: "w", type: "number" },
			{ name: "x", type: "number" },
			{ name: "y", type: "number" },
			{ name: "z", type: "number" },
		],
	},
	{
		name: "Await",
		results: "",
		params: [{ name: "promise", type: "any" }],
	},
	{
		name: "SetTimeout",
		description: "This will execute the specified function after the specified amount of miliseconds",
		results: "",
		params: [
			{ name: "msec", type: "number", description: "The amount of milliseconds to pause the current thread" },
			{ name: "callback", type: "function", description: "The function to run after the timer completes" },
		],
	},
	{
		name: "AddEventHandler",
		description:
			"Use this to listen for events, see the [events](https://docs.fivem.net/docs/scripting-manual/working-with-events/listening-for-events/) page for more info",
		results: "table",
		params: [
			{ name: "msec", type: "number", description: "The name of the event you want to listen to" },
			{ name: "callback", type: "function", description: "The function to run when the event is called" },
		],
	},
	{
		name: "RemoveEventHandler",
		results: "",
		description: "Removes the provided event handler",
		params: [{ name: "eventData", type: "table", description: "The return value of AddEventHandler" }],
	},
	{
		name: "RegisterNetEvent",
		results: "",
		description:
			"Marks the event safe for network use. Aka, allows you to trigger the eventName event on the client, from a server side script. Use AddEventHandler to listen for the event after registering it.",
		params: [
			{ name: "eventName", type: "string", description: "A string representing the event name to register" },
		],
	},
	{
		name: "TriggerEvent",
		description: "Triggers the specified event with optional data",
		results: "",
		params: [
			{ name: "eventName", type: "string", description: "A string representing the event name to trigger" },
			{ name: "...", type: "any", description: "Any additional data that should be passed along" },
		],
	},
	{
		name: "TriggerClientEvent",
		description: "Triggers an event on the specified client(s), and passes on any additional arguments",
		results: "",
		params: [
			{
				name: "eventName",
				type: "string",
				description: "A string representing the event name to call on the client",
			},
			{
				name: "playerId",
				type: "number",
				description: "The ID of the player to call the event for. Specify -1 for all clients",
			},
			{ name: "...", type: "any", description: "Any additional data that should be passed along" },
		],
	},
	{
		name: "GetPlayerIdentifiers",
		description: "Returns a table containing all of the player’s identifiers",
		results: "table",
		params: [{ name: "player", type: "number", description: "The ID of the player to get the identifiers from." }],
	},
	{
		name: "GetPlayers",
		description: "Returns a table of all connected players (server ID’s)",
		results: "table",
		params: [],
	},
	{
		name: "PerformHttpRequest",
		results: "",
		description:
			"Performs a http request using the specified parameters and returns the http response in a callback.",
		params: [
			{ name: "url", type: "string", description: "A string of the URL to request" },
			{
				name: "callback",
				type: "function",
				description: "The callback function to call after the request is finished",
			},
			{ name: "method", type: "string", description: "The HTTP method to use" },
			{ name: "data", type: "table", description: "A string of data to send with the request" },
			{ name: "headers", type: "table", description: "A table of request headers" },
		],
	},
	{
		name: "TriggerServerEvent",
		description: "riggers the specified event on the server with optional data",
		results: "",
		params: [
			{
				name: "eventName",
				type: "string",
				description: "A string representing the event name to call on the server",
			},
			{ name: "...", type: "any", description: "Any additional data that should be passed along" },
		],
	},
	{
		name: "GetFunctionReference",
		results: "string",
		params: [{ name: "func", type: "function" }],
	},
	{
		name: "RegisterNUICallback",
		results: "",
		params: [
			{ name: "type", type: "string" },
			{ name: "cb", type: "function" },
		],
	},
	{
		name: "SendNUIMessage",
		description: "Use this to send data to the NUI",
		results: "",
		params: [{ name: "message", type: "table", description: "data that will be sent and received in NUI" }],
	},
	{
		name: "vector2",
		results: "",
		description: "Creates a new vector",
		params: [
			{
				name: "x",
				type: "number",
				description: "A floating point number representing the `x` value of your vector",
			},
			{
				name: "y",
				type: "number",
				description: "A floating point number representing the `y` value of your vector",
			},
		],
	},
	{
		name: "vector3",
		results: "",
		description: "Creates a new vector",
		params: [
			{
				name: "x",
				type: "number",
				description: "A floating point number representing the `x` value of your vector",
			},
			{
				name: "y",
				type: "number",
				description: "A floating point number representing the `y` value of your vector",
			},
			{
				name: "z",
				type: "number",
				description: "A floating point number representing the `z` value of your vector",
			},
		],
	},
	{
		name: "vector4",
		results: "",
		description: "Creates a new vector",
		params: [
			{
				name: "x",
				type: "number",
				description: "A floating point number representing the `x` value of your vector",
			},
			{
				name: "y",
				type: "number",
				description: "A floating point number representing the `y` value of your vector",
			},
			{
				name: "z",
				type: "number",
				description: "A floating point number representing the `z` value of your vector",
			},
			{
				name: "w",
				type: "number",
				description: "A floating point number representing the `w` value of your vector",
			},
		],
	},
];
