const path = require("path");
//Require the friends array
const friendListData = require("../data/friends.js");

module.exports = (app) => {

	app.get("/api/friendList", (req, res) => {
		res.json(friendListData);
	});

	app.post("/api/friendList", (req, res) => {
		//An overly verbose (but explicit!) way to return the closest match.
		var friendScoreDiffArray = [];
		let newFriendScores = req.body["scores[]"];
		let newFriendScoresSum = newFriendScores.reduce((prev, curr) => Number(prev) + Number(curr));

		//Push all of the friend sums to an array
		for (var i = 0; i < friendListData.length; i++) {
			friendScoreDiffArray.push(Math.abs((friendListData[i]["scores[]"]).reduce((prev,curr) => Number(prev) + Number(curr)) - newFriendScoresSum));
		};

		//Find the index of the person with the smallest difference
		var matchIndex = 0;
		var smallest = friendScoreDiffArray[0];
		for (var f = 0; f < friendScoreDiffArray.length; f++) {

			if (friendScoreDiffArray[f] <= smallest) {
				smallest = friendScoreDiffArray[f];
				matchIndex = f;
			};
		};

		//Push the requested friend to the "database" (friends.js file);
		friendListData.push(req.body);
		res.send(friendListData[matchIndex]);
	});

};