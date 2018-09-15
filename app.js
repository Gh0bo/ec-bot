const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!";
const request = require('request');
const fs = require('fs');

const {
    promisify
} = require('util')
const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)


client.on('ready', ready => {
    console.log(`Log in as ${client.user.tag}`)
})

client.on("ready", () => {
    client.user.setActivity(`prendre le contrôle de Ghorab et de ${client.guilds.size} serveurs`);
    console.log(`Je suis actuellement utilisé sur ${client.guilds.size} serveurs.`)
});

client.on('message', message => {
    if (message.content === "!ec-help") {
        message.reply("\n\n```!ec-link\n!ec-stats <pseudo>\n!ec-guild <pseudo>\n!ec-hub <pseudo>\n!ec-sheepwars <pseudo>\n!ec-pvpswap <pseudo>\n!ec-fk <pseudo>\n!ec-payday <pseudo>\n!ec-pitchout <pseudo>\n!ec-hg <pseudo>\n!ec-ctc <pseudo>\n!ec-domination <pseudo>\n!ec-moutron <pseudo>\n!ec-uhc <pseudo>\n!ec-survivor <pseudo>\n!ec-arrow <pseudo>\n!ec-totem <pseudo>\n!ec-icerunner <pseudo>\n!ec-discosheep <pseudo>\n!ec-epicsmash <pseudo>\n!ec-aoe <pseudo>\n!ec-gladiators <pseudo>\n!ec-uhcrun <pseudo>\n!ec-skyfall <pseudo>\n!ec-fightclub <pseudo>\n!ec-buildwars <pseudo>\n!ec-teamfortress <pseudo>\n!ec-koth <pseudo>\n!ec-rush-mlg <pseudo>\n!ec-diecraft <pseudo>```")

    }
})

client.on('message', message => {
    if (message.content === "!ec-link") {
        message.reply('play.epicube.fr')
    }
})


client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === "ec-stats") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json", async function (err, res, data) {


            let obj = JSON.parse(data)

            let connectedServer = obj.on_server


            if (connectedServer == undefined) {
                message.channel.send({
                    embed: {
                        color: 3447003,
                        author: {
                            icon_url: client.user.avatarURL
                        },
                        title: "Stats de " + obj.player_name,
                        fields: [{
                            name: "Date de la première connexion du joueur sur le serveur",
                            value: obj.player_registration
                        },
                        {
                            name: "Grade",
                            value: obj.tag
                        },
                        {
                            name: "Guilde",
                            value: obj.guild.name
                        },
                        {
                            name: "Niveau de la guilde",
                            value: obj.guild.level
                        },
                        {
                            name: "Joueur banni ? (True/false)",
                            value: obj.is_ban
                        },
                        {
                            name: "Joueur connecté ? (True/false)",
                            value: obj.is_online
                        },
                        {
                            name: "Dernière connexion le ",
                            value: obj.last_logout
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "© EC-BOT By Ghorab"
                        }
                    }
                });
            }

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats de " + obj.player_name,
                    fields: [{
                        name: "Date de la première connexion du joueur sur le serveur",
                        value: obj.player_registration
                    },
                    {
                        name: "Grade",
                        value: obj.tag
                    },
                    {
                        name: "Guilde",
                        value: obj.guild.name
                    },
                    {
                        name: "Niveau de la guilde",
                        value: obj.guild.level
                    },
                    {
                        name: "Joueur banni ? (True/false)",
                        value: obj.is_ban
                    },
                    {
                        name: "Joueur connecté ? (True/false)",
                        value: obj.is_online
                    },
                    {
                        name: "Où ?",
                        value: obj.on_server
                    },
                    {
                        name: "Dernière connexion le ",
                        value: obj.last_logout
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });
        });

    }


    if (command === "ec-stats") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json", async function (err, res, data) {


            let obj = JSON.parse(data)

            let hasGuild = obj.guild

            if (hasGuild == null) {
                message.channel.send({
                    embed: {
                        color: 3447003,
                        author: {
                            icon_url: client.user.avatarURL
                        },
                        title: "Stats de " + obj.player_name,
                        fields: [{
                            name: "Date de la première cosdsdqqdnnexion du joueur sur le serveur",
                            value: obj.player_registration
                        },
                        {
                            name: "Grade",
                            value: obj.tag
                        },
                        {
                            name: "Guilde",
                            value: "Ce joueur n'a pas de guilde"
                        },
                        {
                            name: "Joueur banni ? (True/false)",
                            value: obj.is_ban
                        },
                        {
                            name: "Joueur connecté ? (True/false)",
                            value: obj.is_online
                        },
                        {
                            name: "Dernière connexion le ",
                            value: obj.last_logout
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "© EC-BOT By Ghorab"
                        }
                    }
                });
            }

        });

    }

    if (command === "ec-hub") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en hub de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.hub.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Meilleur temps sur le jump des dieux",
                        value: obj.stats.hub.stat_godjump_best_time
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.hub.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.hub.stat_gain_lc
                    },
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-sheepwars") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en Sheepwars de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.sheepwars.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.sheepwars.stat_win
                    },
                    {
                        name: "Nombre total de défaites",
                        value: obj.stats.sheepwars.stat_lose
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.sheepwars.stat_win / (obj.stats.sheepwars.stat_win + obj.stats.sheepwars.stat_lose) * 100) + "%"
                    },
                    {
                        name: "Nombre total de kills",
                        value: obj.stats.sheepwars.stat_kill
                    },
                    {
                        name: "Nombre total de moutons lancés ",
                        value: obj.stats.sheepwars.stat_sheep_throw
                    },
                    {
                        name: "Nombre total de moutons tués",
                        value: obj.stats.sheepwars.stat_sheep_killed
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.sheepwars.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.sheepwars.stat_gain_lc
                    },
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-pvpswap") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en PvPSwap de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.pvpswap.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de parties",
                        value: parseInt(obj.stats.pvpswap.stat_win + obj.stats.pvpswap.stat_lose)
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.pvpswap.stat_win
                    },
                    {
                        name: "Nombre total de défaites",
                        value: obj.stats.pvpswap.stat_lose
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.pvpswap.stat_win / (obj.stats.pvpswap.stat_win + obj.stats.pvpswap.stat_lose) * 100) + "%"
                    },
                    {
                        name: "Nombre total de kills",
                        value: obj.stats.pvpswap.stat_kill
                    },
                    {
                        name: "Nombre total de têtes utilisés ",
                        value: obj.stats.pvpswap.stat_head_used
                    },
                    {
                        name: "Nombre total d'arènes finales",
                        value: obj.stats.pvpswap.stat_final_arena
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.pvpswap.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.pvpswap.stat_gain_lc
                    },
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }


    if (command === "ec-fk") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en FK de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.fk.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de parties",
                        value: obj.stats.fk.stat_played_game
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.fk.stat_win
                    },
                    {
                        name: "Nombre total de défaites :",
                        value: parseInt(obj.stats.fk.stat_played_game - obj.stats.fk.stat_win)
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.fk.stat_win / (obj.stats.fk.stat_played_game) * 100) + "%"
                    },
                    {
                        name: "Nombre total de kills",
                        value: obj.stats.fk.stat_kill
                    },
                    {
                        name: "Nombre total de coeurs tués ",
                        value: obj.stats.fk.stat_hearth_killed
                    },
                    {
                        name: "Nombre total de coeurs tués en équipe",
                        value: obj.stats.fk.stat_hearth_killed_team
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.fk.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.fk.stat_gain_lc
                    },
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-payday") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en PayDay de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.payday.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.payday.stat_win
                    },
                    {
                        name: "Nombre total de défaites",
                        value: obj.stats.payday.stat_lose
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.payday.stat_win / (obj.stats.payday.stat_win + obj.stats.payday.stat_lose) * 100) + "%"
                    },
                    {
                        name: "Nombre total de voleurs capturés",
                        value: obj.stats.payday.stat_captured_thiefs
                    },
                    {
                        name: "Nombre total de voleurs tasés ",
                        value: obj.stats.payday.stat_tased_thiefs
                    },
                    {
                        name: "Nombre total de coeurs voleur gratuit",
                        value: obj.stats.payday.stat_free_thiefs
                    },
                    {
                        name: "Nombre total de coffres loots",
                        value: obj.stats.payday.stat_chest_looted
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.payday.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.payday.stat_gain_lc
                    },
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }


    if (command === "ec-pitchout") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en Pitchout de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.pitchout.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.pitchout.stat_win
                    },
                    {
                        name: "Nombre total de défaites",
                        value: obj.stats.pitchout.stat_lose
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.pitchout.stat_win / (obj.stats.pitchout.stat_win + obj.stats.pitchout.stat_lose) * 100) + "%"
                    },
                    {
                        name: "Nombre total de wins en teams",
                        value: obj.stats.pitchout.stat_win_team
                    },
                    {
                        name: "Nombre total de défaites en teams",
                        value: obj.stats.pitchout.stat_lose_team
                    },
                    {
                        name: "Nombre total de kills",
                        value: obj.stats.pitchout.stat_kill
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.pitchout.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.pitchout.stat_gain_lc
                    },
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-hg") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en HG de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.hg.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.hg.stat_win
                    },
                    {
                        name: "Nombre total de défaites",
                        value: obj.stats.hg.stat_lose
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.hg.stat_win / (obj.stats.hg.stat_win + obj.stats.hg.stat_lose) * 100) + "%"
                    },
                    {
                        name: "Nombre total de kills",
                        value: obj.stats.hg.stat_kill
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.hg.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.hg.stat_gain_lc
                    },
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }



    if (command === "ec-ctc") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en Catch The Cow de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.catchthecow.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombres de parties jouées",
                        value: obj.stats.catchthecow.stat_played_game
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.catchthecow.stat_win
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.catchthecow.stat_win / (obj.stats.catchthecow.stat_played_game) * 100) + "%"
                    },
                    {
                        name: "Nombre total de kills",
                        value: obj.stats.catchthecow.stat_kill
                    },
                    {
                        name: "Nombre total de morts",
                        value: obj.stats.catchthecow.stat_death
                    },
                    {
                        name: "Nombre total de vaches capturés",
                        value: obj.stats.catchthecow.stat_cow_captured
                    },
                    {
                        name: "Nombre total de vaches obtenues",
                        value: obj.stats.catchthecow.stat_cow_got
                    },
                    {
                        name: "Nombre total d'assists",
                        value: obj.stats.catchthecow.stat_assist
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.catchthecow.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.catchthecow.stat_gain_lc
                    },
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-domination") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en Domination de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.domination.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombres de parties jouées",
                        value: obj.stats.domination.stat_played_game
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.domination.stat_win
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.domination.stat_win / (obj.stats.domination.stat_played_game) * 100) + "%"
                    },
                    {
                        name: "Nombre total de kills",
                        value: obj.stats.domination.stat_kill
                    },
                    {
                        name: "Nombre total de morts",
                        value: obj.stats.domination.stat_death
                    },
                    {
                        name: "Nombre total de points capturés",
                        value: obj.stats.domination.stat_captured_points
                    },
                    {
                        name: "Nombre total d'assists",
                        value: obj.stats.domination.stat_assist
                    },
                    {
                        name: "Nombre total d'assists",
                        value: obj.stats.domination.stat_assist
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.domination.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.domination.stat_gain_lc
                    },
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-moutron") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en Moutron de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.moutron.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombres de bonus utilisés",
                        value: obj.stats.moutron.stat_used_bonus
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.moutron.stat_win
                    },
                    {
                        name: "Nombre total de défaites",
                        value: obj.stats.moutron.stat_lose
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.moutron.stat_win / (obj.stats.moutron.stat_win + obj.stats.moutron.stat_lose) * 100) + "%"
                    },
                    {
                        name: "Nombre total de kills",
                        value: obj.stats.moutron.stat_kill
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.moutron.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.moutron.stat_gain_lc
                    },
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-uhc") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en UHC de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.uhc.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.uhc.stat_win
                    },
                    {
                        name: "Nombre total de défaites",
                        value: obj.stats.uhc.stat_lose
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.uhc.stat_win / (obj.stats.uhc.stat_win + obj.stats.uhc.stat_lose) * 100) + "%"
                    },
                    {
                        name: "Nombre total de kills",
                        value: obj.stats.uhc.stat_kill
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.uhc.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.uhc.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-survivor") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en Survivor de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.survivor.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de parties jouées",
                        value: obj.stats.survivor.stat_played_game
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.survivor.stat_win
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.survivor.stat_win / (obj.stats.survivor.stat_played_game) * 100) + "%"
                    },
                    {
                        name: "Nombre total de zombies tués",
                        value: obj.stats.survivor.stat_zombie_killed
                    },
                    {
                        name: "Nombre total de morts",
                        value: obj.stats.survivor.stat_death
                    },
                    {
                        name: "Nombre total de salles ouvertes",
                        value: obj.stats.survivor.stat_room_unlocked
                    },
                    {
                        name: "Nombre total de fortifications",
                        value: obj.stats.survivor.stat_fortification
                    },
                    {
                        name: "Nombre total de réanimations",
                        value: obj.stats.survivor.stat_svr_rea
                    },
                    {
                        name: "Nombre d'évasions",
                        value: obj.stats.survivor.stat_svr_evasion
                    },
                    {
                        name: "Meilleur temps vague 30",
                        value: obj.stats.survivor.stat_svr_best_time_wave_30
                    },
                    {
                        name: "Meilleur temps vague 50",
                        value: obj.stats.survivor.stat_svr_best_time_wave_50
                    },
                    {
                        name: "Meilleur temps vague 100",
                        value: obj.stats.survivor.stat_svr_best_time_wave_100
                    },
                    {
                        name: "Vague maximum",
                        value: obj.stats.survivor.stat_svr_max_wave
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.survivor.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.survivor.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-arrow") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en Arrow de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.arrow.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.arrow.stat_win
                    },
                    {
                        name: "Nombre total de défaites",
                        value: obj.stats.arrow.stat_lose
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.arrow.stat_win / (obj.stats.arrow.stat_win + obj.stats.arrow.stat_lose) * 100) + "%"
                    },
                    {
                        name: "Nombre total de kills",
                        value: obj.stats.arrow.stat_kill
                    },
                    {
                        name: "Nombre total de morts",
                        value: obj.stats.arrow.stat_death
                    },
                    {
                        name: "Flèches touchants la cible",
                        value: obj.stats.arrow.stat_arrow_hit
                    },
                    {
                        name: "Flèches ratants la cible",
                        value: obj.stats.arrow.stat_missed_arrow
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.arrow.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.arrow.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-totem") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en Totem de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.totem.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de parties jouées",
                        value: obj.stats.totem.stat_played_game
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.totem.stat_win
                    },
                    {
                        name: "Nombre total de défaites",
                        value: parseInt(obj.stats.totem.stat_played_game - obj.stats.totem.stat_win)
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.totem.stat_win / (obj.stats.totem.stat_played_game) * 100) + "%"
                    },
                    {
                        name: "Nombre total de kills",
                        value: obj.stats.totem.stat_kill
                    },
                    {
                        name: "Nombre total de morts",
                        value: obj.stats.totem.stat_death
                    },
                    {
                        name: "Nombre de blocs de totems détruits",
                        value: obj.stats.totem.stat_totem_destroyed
                    },
                    {
                        name: "Nombre de points de défenses",
                        value: obj.stats.totem.stat_defence_points
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.totem.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.totem.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-icerunner") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en Icerunner de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.icerunner.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.icerunner.stat_win
                    },
                    {
                        name: "Nombre total de défaites",
                        value: obj.stats.icerunner.stat_lose
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.icerunner.stat_win / (obj.stats.icerunner.stat_lose) * 100) + "%"
                    },
                    {
                        name: "Nombre total de kills",
                        value: obj.stats.icerunner.stat_kill
                    },
                    {
                        name: "Nombres de points capturés",
                        value: obj.stats.icerunner.stat_capture_points
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.icerunner.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.icerunner.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-discosheep") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en DiscoSheep de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.discosheep.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.discosheep.stat_win
                    },
                    {
                        name: "Nombre total de défaites",
                        value: obj.stats.discosheep.stat_lose
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.discosheep.stat_win / (obj.stats.discosheep.stat_win + obj.stats.discosheep.stat_lose) * 100) + "%"
                    },
                    {
                        name: "Vague maximum",
                        value: obj.stats.discosheep.stat_wave
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.discosheep.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.discosheep.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-epicsmash") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en Epicsmash de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.epicsmash.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total d'éjections",
                        value: obj.stats.epicsmash.stat_ejections
                    },
                    {
                        name: "Nombre total de wins en solo",
                        value: obj.stats.epicsmash.stat_win_solo
                    },
                    {
                        name: "Nombre total de wins en team",
                        value: obj.stats.epicsmash.stat_win_team
                    },
                    {
                        name: "Nombre total de défaites",
                        value: obj.stats.epicsmash.stat_lose
                    },
                    {
                        name: "Nombre total de morts",
                        value: obj.stats.epicsmash.stat_death
                    },
                    {
                        name: "Bourreau",
                        value: obj.stats.epicsmash.stat_death
                    },
                    {
                        name: "Martyr",
                        value: obj.stats.epicsmash.stat_death
                    },
                    {
                        name: "Assassin",
                        value: obj.stats.epicsmash.stat_death
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.epicsmash.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.epicsmash.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-aoe") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en Age of Empire de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.ageofempire.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de parties jouées",
                        value: obj.stats.ageofempire.stat_played_game
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.ageofempire.stat_win
                    },
                    {
                        name: "Nombre de défaites :",
                        value: parseInt(obj.stats.ageofempire.stat_played_game - obj.stats.ageofempire.stat_win)
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.ageofempire.stat_win / (obj.stats.ageofempire.stat_played_game) * 100) + "%"
                    },
                    {
                        name: "Nombre total de morts",
                        value: obj.stats.ageofempire.stat_death
                    },
                    {
                        name: "Nombre d'assists",
                        value: obj.stats.ageofempire.stat_assist
                    },
                    {
                        name: "Victoires par le temps",
                        value: obj.stats.ageofempire.stat_aoe_time_win
                    },
                    {
                        name: "Victoires par le score",
                        value: obj.stats.ageofempire.stat_aoe_score_win
                    },
                    {
                        name: "Victoires par dévastation",
                        value: obj.stats.ageofempire.stat_aoe_last_standing_win
                    },
                    {
                        name: "Nombre de bois récoltés",
                        value: obj.stats.ageofempire.stat_aoe_wood
                    },
                    {
                        name: "Nombre de pierres récoltés",
                        value: obj.stats.ageofempire.stat_aoe_wood
                    },
                    {
                        name: "Nombre de diamants récoltés",
                        value: obj.stats.ageofempire.stat_aoe_wood
                    },
                    {
                        name: "Nombre d'emeraudes récoltés",
                        value: obj.stats.ageofempire.stat_aoe_wood
                    },
                    {
                        name: "Nombre de destructions",
                        value: obj.stats.ageofempire.stat_aoe_destroy
                    },
                    {
                        name: "Nombre de 'clear' ?",
                        value: obj.stats.ageofempire.stat_aoe_clear
                    },
                    {
                        name: "k Réparations",
                        value: obj.stats.ageofempire.stat_aoe_repair
                    },
                    {
                        name: "Fair-play",
                        value: obj.stats.ageofempire.stat_aoe_fair_play
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.ageofempire.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.ageofempire.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-gladiators") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en Gladiators de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.gladiators.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.gladiators.stat_win
                    },
                    {
                        name: "Nombre total de défaites",
                        value: obj.stats.gladiators.stat_lose
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.gladiators.stat_win / (obj.stats.gladiators.stat_win + obj.stats.gladiators.stat_lose) * 100) + "%"
                    },
                    {
                        name: "Nombre total de combats wins",
                        value: obj.stats.gladiators.stat_fight_win
                    },
                    {
                        name: "Nombre total de combats perdus",
                        value: obj.stats.gladiators.stat_fight_lose
                    },
                    {
                        name: "Nombre total de combats en équipes wins",
                        value: obj.stats.gladiators.stat_fight_win_team
                    },
                    {
                        name: "Nombre total de combats en équipes perdus",
                        value: obj.stats.gladiators.stat_fight_lose_team
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.gladiators.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.gladiators.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-uhcrun") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en UHCRun de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.uhcrun.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de parties jouées",
                        value: obj.stats.uhcrun.stat_played_game
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.uhcrun.stat_win
                    },
                    {
                        name: "Nombre total de défaites",
                        value: obj.stats.uhcrun.stat_lose
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.gladiators.stat_win / (obj.stats.gladiators.stat_played_game) * 100) + "%"
                    },
                    {
                        name: "Nombre total de kills",
                        value: obj.stats.uhcrun.stat_kill
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.uhcrun.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.uhcrun.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-skyfall") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en SkyFall de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.skyfall.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.skyfall.stat_win_solo
                    },
                    {
                        name: "Nombre total de défaites",
                        value: obj.stats.skyfall.stat_lose_solo
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.skyfall.stat_win / (obj.stats.skyfall.stat_win + obj.stats.skyfall.stat_lose) * 100) + "%"
                    },
                    {
                        name: "Nombre total de wins en équipes",
                        value: obj.stats.skyfall.stat_win_team
                    },
                    {
                        name: "Nombre total de défaites en équipes",
                        value: obj.stats.skyfall.stat_lose_team
                    },
                    {
                        name: "Nombre total de kills",
                        value: obj.stats.skyfall.stat_kill_solo
                    },
                    {
                        name: "Nombre total de kills en équipes",
                        value: obj.stats.skyfall.stat_kill_team
                    },
                    {
                        name: "Nombre total de kills par le vide",
                        value: obj.stats.skyfall.stat_kill_void
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.skyfall.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.skyfall.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-fightclub") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en FightClub de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.fightclub.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.fightclub.stat_win
                    },
                    {
                        name: "Nombre total de défaites",
                        value: obj.stats.fightclub.stat_lose
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.fightclub.stat_win / (obj.stats.fightclub.stat_win + obj.stats.fightclub.stat_lose) * 100) + "%"
                    },
                    {
                        name: "Nombre total de kills",
                        value: obj.stats.fightclub.stat_kill
                    },
                    {
                        name: "Nombre total d'arènes finales",
                        value: obj.stats.fightclub.stat_final_arena
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.fightclub.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.fightclub.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-buildwars") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en Buildwars de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.buildwar.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de parties jouées",
                        value: obj.stats.buildwar.stat_played_game
                    },

                    {
                        name: "Nombre total de blocs placés",
                        value: obj.stats.buildwar.stat_block_placed
                    },
                    {
                        name: "Nombre total de wins en solo",
                        value: obj.stats.buildwar.stat_win_solo
                    },
                    {
                        name: "Nombre de défaites en solo :",
                        value: parseInt(obj.stats.gladiators.stat_played_game - obj.stats.gladiators.stat_win_solo)
                    },
                    {
                        name: "Nombre total de wins en 2v2",
                        value: obj.stats.buildwar.stat_win_2v2
                    },
                    {
                        name: "Nombre de défaites en 2v2 :",
                        value: parseInt(obj.stats.buildwar.stat_played_game - obj.stats.buildwar.stat_win_2v2)
                    },
                    {
                        name: "Nombre total de wins en 3v3",
                        value: obj.stats.buildwar.stat_win_3v3
                    },
                    {
                        name: "Nombre de défaites en 3v3 :",
                        value: parseInt(obj.stats.buildwar.stat_played_game - obj.stats.buildwar.stat_win_3v3)
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.buildwar.stat_win / (obj.stats.buildwar.stat_played_game) * 100) + "%"
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.buildwar.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.buildwar.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-teamfortress") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en TeamFortress de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.teamfortress.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de protections",
                        value: obj.stats.teamfortress.stat_tf_protect
                    },
                    {
                        name: "Nombre total de meilleurs kills",
                        value: obj.stats.teamfortress.stat_best_kill
                    },
                    {
                        name: "Nombre total de pushs",
                        value: obj.stats.teamfortress.stat_tf_push
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.teamfortress.stat_win
                    },
                    {
                        name: "Nombre total de défaites",
                        value: obj.stats.teamfortress.stat_lose
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.teamfortress.stat_win / (obj.stats.teamfortress.stat_win + obj.stats.teamfortress.stat_lose) * 100) + "%"
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.teamfortress.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.teamfortress.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-koth") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en Koth de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.koth.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de parties jouées",
                        value: obj.stats.koth.stat_played_game
                    },
                    {
                        name: "Nombre total de wins",
                        value: obj.stats.koth.stat_win
                    },
                    {
                        name: "Nombre total de défaites :",
                        value: parseInt(obj.stats.koth.stat_played_game - obj.stats.koth.stat_win)
                    },
                    {
                        name: "Winrate :",
                        value: parseInt(obj.stats.koth.stat_win / (obj.stats.koth.stat_played_game) * 100) + "%"
                    },
                    {
                        name: "Nombre total de kills",
                        value: obj.stats.koth.stat_kill
                    },
                    {
                        name: "Nombre total de morts",
                        value: obj.stats.koth.stat_death
                    },
                    {
                        name: "Nombre total d'assists",
                        value: obj.stats.koth.stat_assist
                    },
                    {
                        name: "Nombre total de dégâts infligés",
                        value: obj.stats.koth.stat_total_damage
                    },
                    {
                        name: "Temps total de captures (en minutes)",
                        value: obj.stats.koth.stat_capture_time
                    },
                    {
                        name: "Nombre total de golems tués",
                        value: obj.stats.koth.stat_golem_kill
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.koth.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.koth.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-rush-mlg") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en Rush de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.rush.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Nombre total de parties jouées en rush",
                        value: obj.stats.rush.stat_played_game
                    },
                    {
                        name: "Nombre total de wins en rush",
                        value: obj.stats.rush.stat_win
                    },
                    {
                        name: "Nombre total de défaites en rush :",
                        value: parseInt(obj.stats.rush.stat_played_game - obj.stats.rush.stat_win)
                    },
                    {
                        name: "Winrate en rush:",
                        value: parseInt(obj.stats.rush.stat_win / obj.stats.rush.stat_played_game * 100) + "%"
                    },
                    {
                        name: "Nombre total de lits cassés en rush",
                        value: obj.stats.rush.stat_rush_bed_break
                    },
                    {
                        name: "Nombre total de kills en rush",
                        value: obj.stats.rush.stat_kill
                    },
                    {
                        name: "Nombre total de parties jouées en mlg",
                        value: obj.stats.rush.stat_rush_mlg_played
                    },
                    {
                        name: "Nombre total de wins en mlg",
                        value: obj.stats.rush.stat_rush_mlg_win
                    },
                    {
                        name: "Nombre total de défaites en mlg :",
                        value: parseInt(obj.stats.rush.stat_rush_mlg_played - obj.stats.rush.stat_rush_mlg_win)
                    },
                    {
                        name: "Winrate en mlg:",
                        value: parseInt(obj.stats.rush.stat_rush_mlg_win / (obj.stats.rush.stat_rush_mlg_played) * 100) + "%"
                    },
                    {
                        name: "Nombre total de points marqués en mlg",
                        value: obj.stats.rush.stat_rush_mlg_points_win
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.rush.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.rush.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-BOT By Ghorab"
                    }
                }
            });

        });
    }

    if (command === "ec-diecraft") {
        const player = args.join(' ');
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {

            let obj = JSON.parse(data)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        icon_url: client.user.avatarURL
                    },
                    title: "Stats en Rush de : " + obj.player_name,
                    fields: [{
                        name: "Pseudo",
                        value: obj.player_name,
                    },
                    {
                        name: "Temps total",
                        value: parseInt(obj.stats.diecraft.stat_total_time / 60, 10) + ' heures'
                    },
                    {
                        name: "Score maximum en Easy",
                        value: obj.stats.diecraft.stat_score_max_easy
                    },
                    {
                        name: "Niveau maximum en Easy",
                        value: obj.stats.diecraft.stat_level_max_easy
                    },
                    {
                        name: "stat_diecraft_run_time_max_easy veut dire ?",
                        value: obj.stats.diecraft.stat_diecraft_run_time_max_easy
                    },
                    {
                        name: "Nombre de parties en Easy",
                        value: obj.stats.diecraft.stat_diecraft_run_started_easy
                    },
                    {
                        name: "Wins en Easy",
                        value: obj.stats.diecraft.stat_diecraft_world_wins_easy
                    },
                    {
                        name: "Nombre de défaites en easy",
                        value: parseInt(obj.stats.diecraft.stat_diecraft_run_started_easy - obj.stats.diecraft.stat_diecraft_world_wins_easy)
                    },
                    {
                        name: "Winrate en easy",
                        value: parseInt(obj.stats.diecraft.stat_diecraft_world_wins_easy / (obj.stats.diecraft.stat_diecraft_run_started_easy)) * 100 + "%"
                    },
                    {
                        name: "Score maximum en Normal",
                        value: obj.stats.diecraft.stat_score_max_normal
                    },
                    {
                        name: "Niveau maximum en Normal",
                        value: obj.stats.diecraft.stat_level_max_normal
                    },
                    {
                        name: "stat_diecraft_run_time_max_normal veut dire ?",
                        value: obj.stats.diecraft.stat_diecraft_run_time_max_normal
                    },
                    {
                        name: "Nombre de parties en Normal",
                        value: obj.stats.diecraft.stat_diecraft_run_started_normal
                    },
                    {
                        name: "Wins en Normal",
                        value: obj.stats.diecraft.stat_diecraft_world_wins_normal
                    },
                    {
                        name: "Défaites en normal",
                        value: parseInt(obj.stats.diecraft.stat_diecraft_run_started_normal - obj.stats.diecraft.stat_diecraft_world_wins_normal)
                    },
                    {
                        name: "Winrate en normal",
                        value: parseInt(obj.stats.diecraft.stat_diecraft_world_wins_normal / (obj.stats.diecraft.stat_diecraft_run_started_normal) * 100) + "%"
                    },
                    {
                        name: "Score maximum en Hard",
                        value: obj.stats.diecraft.stat_score_max_hard
                    },
                    {
                        name: "Niveau maximum en Hard",
                        value: obj.stats.diecraft.stat_level_max_hard
                    },
                    {
                        name: "stat_diecraft_run_time_max_hard veut dire ?",
                        value: obj.stats.diecraft.stat_diecraft_run_time_max_hard
                    },
                    {
                        name: "Nombre de parties en Hard",
                        value: obj.stats.diecraft.stat_diecraft_run_started_hard
                    },
                    {
                        name: "Wins en Hard",
                        value: obj.stats.diecraft.stat_diecraft_world_wins_hard
                    },
                    {
                        name: "Défaites en Hard",
                        value: parseInt(obj.stats.diecraft.stat_diecraft_run_started_hard - obj.stats.diecraft.stat_diecraft_world_wins_hard)
                    },
                    {
                        name: "Winrate en Hard",
                        value: parseInt(obj.stats.diecraft.stat_diecraft_world_wins_normal / (obj.stats.diecraft.stat_diecraft_run_started_hard) * 100) + "%"
                    },
                    {
                        name: "Gain total d'EC",
                        value: obj.stats.diecraft.stat_gain_ec
                    },
                    {
                        name: "Gain total d'LC",
                        value: obj.stats.diecraft.stat_gain_lc
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© EC-bot by Ghorab"
                    }
                }
            });

        });
    }


})




client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === "ec-guild") {
        const player = args.join(' ')
        message.delete();

        request("https://stats.epicube.fr/player/" + player + ".json?with=stats", async function (err, res, data) {
            let obj = JSON.parse(data);
            console.log(obj.guild)
            request("https://stats.epicube.fr/guild/" + obj.guild.name + ".json", async function (err, res, data) {
                let guild = JSON.parse(data)
                const nameOfPlayer = guild.members.find((m) => m.name === player)

                var totalMemberArray = guild.members;
                var arrayLength = totalMemberArray.length;
                for (var totalMember = 0; totalMember < arrayLength; totalMember++) {
                }
                // console.log(nameOfPlayer)
                message.channel.send({
                    embed: {
                        color: 3447003,
                        author: {
                            icon_url: client.user.avatarURL
                        },
                        title: "Stats du joueur : " + obj.player_name + " dans la guilde " + guild.name,
                        fields: [{
                            name: "Guilde",
                            value: guild.name
                        },
                        {
                            name: "Date de création de la guilde",
                            value: guild.creation_date
                        },
                        {
                            name: "Niveau de la guilde",
                            value: obj.guild.level
                        },
                        {
                            name: "Progression jusqu'au prochain niveau ",
                            value: parseInt(guild.experience) + " / " + parseInt(guild.needed_experience)
                        },
                        {
                            name: "Nombre de membres",
                            value: totalMember
                        },
                        {
                            name: "Rank",
                            value: guild.rank
                        },
                        {
                            name: "Grade",
                            value: nameOfPlayer.group.name
                        },
                        {
                            name: "Expérience totale apporté par le joueur",
                            value: nameOfPlayer.xp_gained,
                        },
                        {
                            name: "Il a rejoint la guilde le",
                            value: nameOfPlayer.join_date
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "© EC-bot by Ghorab"
                        }
                    }
                });

            });

        }
        )
    }
})

client.on('message', message => {

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();


    if (command === "ec-guild") {
        const player = args.join(' ');
        message.delete();
    
        request("https://stats.epicube.fr/player/" + player + ".json", async function (err, res, data) {
    
    
            let obj = JSON.parse(data)
    
            let hasGuild = obj.guild
    
            if (hasGuild == null) {
                message.channel.send({
                    embed: {
                        color: 3447003,
                        author: {
                            icon_url: client.user.avatarURL
                        },
                        title: "Stats de " + obj.player_name,
                        fields: [
                        {
                            name: "Guilde",
                            value: "Ce joueur n'a pas de guilde"
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "© EC-BOT By Ghorab"
                        }
                    }
                });
            }
    
        });
    
    }
})




client.login(process.env.BOT_TOKEN);
