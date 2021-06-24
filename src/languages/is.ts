import { Formattable, FormattableArray as FA } from "../structures/formattable.struct";
export const language: Languages = {
	blacklisted: "Fyrirgefðu, þú hefur verið bannaður, þú getur ekki keyrt commands þangað till að þú verður unbannaður.",
	commands: {
		help: {
			title: new Formattable("Commands Listi: Síða {} af {}"),
			description: "List af commands fyrir Drunk Bartender.",
			sent: "[yes] Ég hef sent þér listan af commands!",
		},
		ping: {
			calculating: "Reiknar ping...",
			speeds: [
				"Ég er brotin, þetta er of hæght.",
				"Mér líður hægur...",
				"Ekki of hæght, en ekki of hratt.",
				"Svo Hratt!",
				"Wow! æðislegja hratt!",
				"~~Discord Bartender er tíma ferðamaður.~~",
			],
			pong: new Formattable("🏓 Pong! Tók `{}`, {}"),
		},
		list: {
			noOrders: "[no] Engar pantanir komnar inn."
		},
		work: {
			responses: FA([
				"Grass er ekki alvöru en {} peninguring sem þú fékst er.",
				"Þú sprengdir upp fjall og seldir afganga fyrir {}.",
				"Þú seldir blað fyrir {}.",
				"Þú tókst sturtu, og fékst {}.",
				"Þú láttir grass vera alvöru og fékst {} í staðin.",
				"Þú horfðir á mynd og fékst {}.",
				"Þú prentaðir {} frá prentarinum þínum.",
				"Þú drapst dreka og fékst {}.",
				"Tíma ferðarmen komu og gáfu þér {} til að bjarga þeira tímalínu.",
				"Þú hríngdir í leigubíll í staðin fyrir að keyra fullur. þú fékst {}.",
				"Borgarlegir óeirðir fylgir. Þú Verndar barinn í nágreininu. þú færð {}.",
				"Borgarlegir óeirðir fylgir. Þú rænir barinn í nágreininu. þú færð {}.",
				"Borgarlegir óeirðir fylgir. Þú pantar bjór í bunker. þú færð {}.",
				"Þú skiptir eignum þínum og fjárfestir í Discord Bartender. þú færð {}.",
				"Þú greindir galla í Discord Bartender bot og tilkynnti það. Þú fékkst {} í staðin.",
				"Þú greindir galla í Discord Bartender láni og nýttir það til að fá {}.",
				"Þú lætur eins og þú tilheyrir á lögreglustöðinni og hefur fengið {}.",
				"Þú kaus í sveitarstjórnarkosningunum þínum og fékk {}.",
				"Hlé herbergi er töfrandi blessað. Þú fékkst {}.",
				"Þú reynir að kalla til illan anda, en allt sem birtist eru hrúgur af peningum. Þú fékkst {}."
			])
		},
		order: {
			success: new Formattable("[yes] þín pöntun: **{}** hefur verið mótekin! Pöntunar númer: `{}`."),
			exists: "[no] Þú hefur virka pöntun."
		},
		claim: {
			success: new Formattable("[yes] Þú hefur tekið pöntun `{}`."),
			exists: "[no] Þú ert með pöntum sem þú þarft að klára.",
			own: "[no] Þú getur ekki tekið þína eigin pöntun.",
		},
		unclaim: {
			notFound: "[no] Þú hefur ekki virka pöntun.",
			success: new Formattable("[yes] Pöntun `{}` hefur verið ótekin.")
		},
		brew: {
			success: "[yes] Pöntunin hefur verið brugguð. Það er nú að gerjast.",
		},
		finishdelivery: {
			channel: "[no] Þú ert ekki í réttri afhendingarás.",
			success: "[truck] Afhendingin var staðfest.",
		}
	},
	errors: {
		codes: {
			10004: "[no] Error: óþekktur server.",
			50013: "[no] Error: Heimildir vantar. Botinn hefur ekki nægar heimildir til að keyra umbeðið verkefni.",
		},
		internal: new Formattable("🔌 Því miður kom upp innri villa. \n```js\n{}\n```"),
		args: new Formattable("{}\n**Rétt setningafræði**: `{}{} {}`"),
		argsTypes: [
			new Formattable("Rökin `{}` voru af röngri gerð."),
			new Formattable("Rökstuðningur `{}` er krafist en fannst ekki."),
		],
		permission: new Formattable("[no] Þú hefur ekki rétta leyfi til að nota þetta cmd .\nÞér vantar `{}` til að geta keyrt þetta cmd."),
		graph: new Formattable("[no] Ógild jafna.\n`{}`"),
		cooldown: new Formattable("[no] þú verður að bíða `{}` áður en þú getur keyrt `{}` aftur."),
		guildPermission: new Formattable("[no] Ég hef ekki nægar heimildir á þessum server til að keyra umbeðið verkefni. Ég þarf samt heimildirnar {}."),
		noOrder: "[ripped] Þú ert ekki með virka pöntun eins og er.",
		noClaimedOrder: "[ripped] Þú hefur ekki virka pöntun.",
		notPreparing: "[ripped] Pöntunin þín, sem krafist er, er nú ekki í undirbúningi.",
		notDelivering: "[ripped] Tilgreind pöntun er ekki tilbúin til afhendingar.",
		url: "🔗 linkið sem þú gafst upp var ekki vefslóð."
	},
};
