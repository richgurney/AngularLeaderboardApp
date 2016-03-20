angular
  .module("pulseball")
  .controller("pulseballInit", pulseballInit);

function pulseballInit() {
	var self = this;

	// the starting leaderboard
	self.board = [
		{ "team": { "name": "Australia", "id": 32 }, "pos": 1, "pts": 54.23},
		{ "team": { "name": "New Zealand", "id": 62 }, "pos": 2, "pts":54.00 },
		{ "team": { "name": "France", "id": 2 }, "pos": 3, "pts": 52.95 },
		{ "team": { "name": "England", "id": 1 }, "pos": 4, "pts": 52.32 },
		{ "team": { "name": "Romania", "id": 24 }, "pos": 5, "pts": 43.50 }
	];

	// make avaible the team details
	var australia = self.board[0];
	var newZealand = self.board[1];
	var france = self.board[2];
	var england = self.board[3];
	var romania = self.board[4];

	self.teams = [
		{"name" : "Australia", "ref" : self.board[0].pts},
		{"name" : "New Zealand", "ref" : self.board[1].pts},
		{"name" : "France", "ref" : self.board[2].pts},
		{"name" : "England", "ref" : self.board[3].pts},
		{"name" : "Romania", "ref" : self.board[4].pts}
	];

	self.homeTeam;
	self.awayTeam;

	self.homeTeamScore;
	self.awayTeamScore;

	self.leaderboard = [
		{ "team": { "name": "Australia", "id": 32 }, "pos": 1, "pts": australia.pts},
		{ "team": { "name": "New Zealand", "id": 62 }, "pos": 2, "pts": newZealand.pts},
		{ "team": { "name": "France", "id": 2 }, "pos": 3, "pts": france.pts},
		{ "team": { "name": "England", "id": 1 }, "pos": 4, "pts": england.pts},
		{ "team": { "name": "Romania", "id": 24 }, "pos": 5, "pts": romania.pts}
	];

	self.addMatch = function() {

		// delare variables to make prediction
		var homeTeamName				= self.homeTeam;
		var awayTeamName				= self.awayTeam;

	 	//for loop to set the awayTeamRat
		for (var i=0; i<self.teams.length; i++) {
		  if (self.teams[i].name == homeTeamName) {
		   homeTeamRat = self.teams[i].ref;
		   console.log(homeTeamName)
		   console.log(homeTeamRat)
		  } 
		}

		for (var i=0; i<self.teams.length; i++) {
		  if (self.teams[i].name == awayTeamName) {
		   awayTeamRat = self.teams[i].ref;
		   console.log(awayTeamName)
		   console.log(awayTeamRat)
		  } 
		}

		var homeTeamScore 		= self.homeTeamScore;
		var awayTeamScore 		= self.awayTeamScore;
		var tempHomeRating 		= homeTeamRat + 3;
		var ratingDiff 				= (tempHomeRating - awayTeamRat);
		
		// caping the rating Difference
		if(ratingDiff > 10) {
			// console.log("Im greater than 10 so im capped at 10")
			ratingDiff = 10;
		} else if (ratingDiff < -10) {
			// console.log("Im less than -10 so im capped at -10")
			ratingDiff = -10;
		}

		// who won?
		if (homeTeamScore < awayTeamScore) {
			console.log("away is winner")
			winner = awayTeamName;
		} else if (homeTeamScore > awayTeamScore) {
			winner = homeTeamName;
		} else {
			winner = "draw";
		}

		console.log("Winner is " + winner)

		// Calculate new ranking
		if(winner == homeTeamName){					
			newHomeRating = homeTeamRat + (1 + (ratingDiff /10));			
			newAwayRating = awayTeamRat - (1 + (ratingDiff /10));		
			
			for (var i=0; i<self.leaderboard.length; i++) {
			  if (self.leaderboard[i].team.name == homeTeamName) {
			    self.leaderboard[i].pts = newHomeRating;
			    console.log(self.leaderboard[i].pts);
			  } 
			}

			for (var i=0; i<self.leaderboard.length; i++) {
			  if (self.leaderboard[i].team.name == awayTeamName) {
			    self.leaderboard[i].pts = newAwayRating;
			    console.log(self.leaderboard[i].pts);
			  }
			}  

		} else if (winner == awayTeamName){
			console.log("Away team won")
			newHomeRating = homeTeamRat - (1 + (ratingDiff /10));
			newAwayRating = awayTeamRat + (1 + (ratingDiff /10));

			for (var i=0; i<self.leaderboard.length; i++) {
			  if (self.leaderboard[i].team.name == homeTeamName) {
			    self.leaderboard[i].pts = newHomeRating;
			  } 
			}

			for (var i=0; i<self.leaderboard.length; i++) {
			  if (self.leaderboard[i].team.name == awayTeamName) {
			    self.leaderboard[i].pts = newAwayRating;
			  }
			}

		} else {
			newHomeRating = homeTeamRat + (ratingDiff /10);
			newAwayRating = awayTeamRat + (ratingDiff /10);

			for (var i=0; i<self.leaderboard.length; i++) {
			  if (self.leaderboard[i].team.name == homeTeamName) {
			    self.leaderboard[i].pts = newHomeRating;
			  } 
			}

			for (var i=0; i<self.leaderboard.length; i++) {
			  if (self.leaderboard[i].team.name == awayTeamName) {
			    self.leaderboard[i].pts = newAwayRating;
			  }
			}
		}
		self.homeTeam = "";
		self.awayTeam = "";
		self.homeTeamScore = "";
		self.awayTeamScore = "";
	}	
		
}

pulseballInit();

