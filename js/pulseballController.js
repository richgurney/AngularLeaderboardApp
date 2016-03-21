angular
  .module("pulseball")
  .controller("pulseballInit", pulseballInit);

function pulseballInit() {
	var self = this;
	self.homeTeam;
	self.awayTeam;
	self.homeTeamScore;
	self.awayTeamScore;
	self.leaderboard = [
		{ "team": { "name": "Australia", "id": 32 }, "pos": 1, "pts": 54.23},
		{ "team": { "name": "New Zealand", "id": 62 }, "pos": 2, "pts":54.00 },
		{ "team": { "name": "France", "id": 2 }, "pos": 3, "pts": 52.95 },
		{ "team": { "name": "England", "id": 1 }, "pos": 4, "pts": 52.32 },
		{ "team": { "name": "Romania", "id": 24 }, "pos": 5, "pts": 43.50 }
	];
	self.teams = [
		{"name" : "Australia", "ref" : self.leaderboard[0].pts},
		{"name" : "New Zealand", "ref" : self.leaderboard[1].pts},
		{"name" : "France", "ref" : self.leaderboard[2].pts},
		{"name" : "England", "ref" : self.leaderboard[3].pts},
		{"name" : "Romania", "ref" : self.leaderboard[4].pts}
	];

	self.resetBoard = function() {
		self.leaderboard = [
			{ "team": { "name": "Australia", "id": 32 }, "pos": 1, "pts": 54.23},
			{ "team": { "name": "New Zealand", "id": 62 }, "pos": 2, "pts":54.00 },
			{ "team": { "name": "France", "id": 2 }, "pos": 3, "pts": 52.95 },
			{ "team": { "name": "England", "id": 1 }, "pos": 4, "pts": 52.32 },
			{ "team": { "name": "Romania", "id": 24 }, "pos": 5, "pts": 43.50 }
		];
	}

	self.addMatch = function() {
		// delare variables to make prediction
		var homeTeamName = self.homeTeam;
		var awayTeamName = self.awayTeam;
	 	//for loop to set the home team rating
		for (var i=0; i<self.teams.length; i++) {
		  if (self.teams[i].name == homeTeamName) {
		   homeTeamRat = self.teams[i].ref;
		  } 
		}
		// for loop to set the away team rating
		for (var i=0; i<self.teams.length; i++) {
		  if (self.teams[i].name == awayTeamName) {
		   awayTeamRat = self.teams[i].ref;
		  } 
		}
		// set the score to for both team to user input
		var homeTeamScore = self.homeTeamScore;
		var awayTeamScore = self.awayTeamScore;
		// set the temp home rating and ratting diffence
		var tempHomeRating = homeTeamRat + 3;
		var ratingDiff = (tempHomeRating - awayTeamRat);
		// logic for
		// caping the rating Difference
		if(ratingDiff > 10) {
			ratingDiff = 10;
		} else if (ratingDiff < -10) {
			ratingDiff = -10;
		}
		// who won the game?
		if (homeTeamScore < awayTeamScore) {
			winner = awayTeamName;
		} else if (homeTeamScore > awayTeamScore) {
			winner = homeTeamName;
		} else {
			winner = "draw";
		}
		// Calculate new rankings
		if(winner == homeTeamName){
			// set the team rating if home team won
			newHomeRating = homeTeamRat + (1 + (ratingDiff /10));			
			newAwayRating = awayTeamRat - (1 + (ratingDiff /10));		
			// changes the leaderboard object with the new home team rating
			for (var i=0; i<self.leaderboard.length; i++) {
			  if (self.leaderboard[i].team.name == homeTeamName) {
			    self.leaderboard[i].pts = newHomeRating;
			  } 
			}
			// changes the leaderboard object with the new away team rating
			for (var i=0; i<self.leaderboard.length; i++) {
			  if (self.leaderboard[i].team.name == awayTeamName) {
			    self.leaderboard[i].pts = newAwayRating;
			  }
			}  
		} else if (winner == awayTeamName){
			// set the team rating if away team won
			newHomeRating = homeTeamRat - (1 + (ratingDiff /10));
			newAwayRating = awayTeamRat + (1 + (ratingDiff /10));
			// changes the leaderboard object with the new home team rating
			for (var i=0; i<self.leaderboard.length; i++) {
			  if (self.leaderboard[i].team.name == homeTeamName) {
			    self.leaderboard[i].pts = newHomeRating;
			  } 
			}
			// changes the leaderboard object with the new away team rating
			for (var i=0; i<self.leaderboard.length; i++) {
			  if (self.leaderboard[i].team.name == awayTeamName) {
			    self.leaderboard[i].pts = newAwayRating;
			  }
			}
			// sets the team ratings if there was a draw
		} else {
			// adds the same rating to both teams
			newHomeRating = homeTeamRat + (ratingDiff /10);
			newAwayRating = awayTeamRat + (ratingDiff /10);
			// changes the leaderboard object with the new home team rating
			for (var i=0; i<self.leaderboard.length; i++) {
			  if (self.leaderboard[i].team.name == homeTeamName) {
			    self.leaderboard[i].pts = newHomeRating;
			  } 
			}
			// changes the leaderboard object with the new away team rating
			for (var i=0; i<self.leaderboard.length; i++) {
			  if (self.leaderboard[i].team.name == awayTeamName) {
			    self.leaderboard[i].pts = newAwayRating;
			  }
			}
		}
		// resets the bidning values
		self.homeTeam = "";
		self.awayTeam = "";
		self.homeTeamScore = "";
		self.awayTeamScore = "";
	}			
}

pulseballInit();

