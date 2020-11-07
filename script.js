jQuery.githubUser = function (username, callback) {
    jQuery.getJSON('https://api.github.com/users/' + username + '/repos?callback=?&per_page=100', callback);

};

jQuery.fn.loadRepos = function (username) {
    this.html('<div class="loading">Querying GitHub for ' + username + '\'s repos...</div>');

    var target = this;
    $.githubUser(username, function (data) {
        var repos = data.data; // JSON Parsing
        sortByName(repos);
        target.empty();
        $(repos).each(function () {
            target.append('<tr>' +
                '<td class="item"><a href="' + this.html_url +
                '">' + this.name + '</a></td>' +
                '<td class="language">' + this.language + '</td>' +
                '<td class="description">' + this.description + '</td>' +
                '<td><span class="stats"><i class="code branch icon"></i>' + this.forks_count + ' &middot; <i class="star icon"></i>' + this.stargazers_count + '</span></td>' +
                '<td class="datetime"><span title="' + realDate(this.updated_at) + '">' +
                prettyDate(this.updated_at) + '</span></td>' +
                '</tr>');
        });
    });

    function sortByName(data) {
        data.sort(function (a, b) {
            return a.name - b.name;
        });
    }

    function prettyDate(time) {
        var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
        var secs = (((new Date()).getTime() - date.getTime()) / 1000);
        Math.floor(secs);
        var minutes = secs / 60;
        secs = Math.floor(secs % 60);
        if (minutes < 1) {
            return secs + (secs > 1 ? ' seconds ago' : ' second ago');
        }
        var hours = minutes / 60;
        minutes = Math.floor(minutes % 60);
        if (hours < 1) {
            return minutes + (minutes > 1 ? ' minutes ago' : ' minute ago');
        }
        var days = hours / 24;
        hours = Math.floor(hours % 24);
        if (days < 1) {
            return hours + (hours > 1 ? ' hours ago' : ' hour ago');
        }
        var weeks = days / 7;
        days = Math.floor(days % 7);
        if (weeks < 1) {
            return days + (days > 1 ? ' days ago' : ' day ago');
        }
        var months = weeks / 4.35;
        weeks = Math.floor(weeks % 4.35);
        if (months < 1) {
            return weeks + (weeks > 1 ? ' weeks ago' : ' week ago');
        }
        var years = months / 12;
        months = Math.floor(months % 12);
        if (years < 1) {
            return months + (months > 1 ? ' months ago' : ' month ago');
        }
        years = Math.floor(years);
        return years + (years > 1 ? ' years ago' : ' years ago');
    }

    function realDate(time) {
        return new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
    }
};

$("#myTableBody").loadRepos("nhutnamhcmus");