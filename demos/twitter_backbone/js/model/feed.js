module.declare(
    [   
        { tweet: "js/model/tweet" }
    ],
    function(require, exports, module) {
        var Tweet = require("tweet").Tweet,
            Feed = Backbone.Collection.extend({
                localStorage: new Store("tweets")
                , model: Tweet

                , loadUser: function(username) {
                    var that = this;
                    while(this.length > 0) {
                        this.each(function(tweet){
                            tweet.destroy();
                        });
                    }
                    $.getJSON(
                        'https://api.twitter.com/1/statuses/user_timeline.json?callback=?'
                        , {
                            include_entities: "true"
                            , include_rts: "true"
                            , screen_name: username
                        }
                        , function(data) {
                            _.each(data, function(tweet) {
                                var newTweet = that.create(tweet);
                            });
                        }); 
                }
            });
        exports.feed = new Feed;
    }
);
