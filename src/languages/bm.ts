import { Formattable, FormattableArray as FA } from "../structures/formattable.struct";
export const language: Languages = {

	blacklisted: "Maaf, anda kini disenaraikan hitam, anda tidak dibenarkan menjalankan perintah.",
	commands: {
		help: {
			title: new Formattable("Commands List: Page {} of {}"),
			description: "A list of commands for the bot.",
			sent: "[yes] Saya telah menghantar senarai arahan kepada anda.",
		},
		ping: {
			calculating: "Sedang mengira ping...",
			speeds: [
				"Bot ini telah rosak, kerana terlalu lambat..",
				"Saya rasa beban...",
				"Tidak terlalu lambat dan laju pada masa yang sama.",
				"Lajunya!",
				"Wah! Sungguh laju!",
				"~~Discord Bartender macam pengembara masa.~~",
			],
			pong: new Formattable("🏓 Pong! Ambil `{}`, {}"),
		},
		list: {
			noOrders: "[no] There are currently no orders."
		},
		work: {
			responses: FA([
				"Rumput tidak wujud, tapi {} yang anda dapat wujud.",
				"Anda telah meletupkan gunung dan dibayar sebanyak {}.",
				"Anda telah menjual sekeping kertas sebanyak {}.",
				"Anda telah mandi dan mendapat sebanyak {}.",
				"Anda telah membuatkan rumput menjadi nyata dan mendapat sebanyak {} sebagai upah.",
				"Anda telah menonton panggung wayang dan mendapat sebanyak {}.",
				"Anda telah mencetak {} daripada mesin pencetak kertas anda.",
				"Anda telah membunuh seekor naga dan diupah sebanyak {}.",
				"Beberapa pengembara dari masa depan membawa {} untuk menyelamatkan garis masa mereka.",
				"Anda telah memanggil teksi untuk mengelakkan memandu dalam keadaan mabuk. Anda dibayar sebanyak {}.",
				" Rusuhan seluruh bandar sedang berlaku. Anda dapat mempertahankan bar tempatan anda. Anda dibayar sebanyak {}.",
				"Rusuhan seluruh bandar sedang berlaku. Anda merampas balik bar tempatan anda. Anda dibayar sebanyak {}.",
				"Rusuhan seluruh bandar sedang berlaku. Anda telah memesan bir dari sebuah bunker. Anda dibayar sebanyak {}.",
				"Anda telah mencairkan aset anda dan melaburkannya pada Discord Bartender. Anda dibayar sebanyak {}.",
				"Anda telah menjumpa bug di dalam bot Discord Bartender, dan melaporkannya. Anda dibayar sebanyak {} sebagai upah.",
				"Anda mengenal pasti bug dalam bot Discord Bartender, dan mengeksploitasikannya. Anda dibayar sebanyak {}.",
				"Anda bertindak seperti anda berada di balai polis, dan mendapat sebanyak {}.",
				"Anda telah mengundi dalam pilihan raya tempatan anda, dan mendapat sebanyak {}.",
				"Ruang rehat diberkati secara ajaib. Anda mendapat sebanyak {}.",
				"Anda cuba untuk memanggil iblis, tetapi semua yang muncul adalah timbunan wang. Anda dibayar sebanyak {}."
			])
		},
		crime: {
			responses: FA([
				"Anda telah merompak bank dan mendapat sebanyak {}.",
				"Anda telah meragut seorang wanita tua dan mendapat sebanyak {}.",
				"Anda telah merompak sebuah trak yang berperisai tinggi dan mendapat sebanyak {}.",
				"Anda telah merompak sebuah pasar dan mendapat sebanyak {}.",
				"Anda telah mengutip beberapa batu di tapak pembinaan dan menjualnya sebanyak {}.",
				"Anda telah membuat keputusan untuk mencuri batu-bata dan menjualnya sebanyak {}.",
				"Anda berjaya mencuri donat dari Donut Delivery dan menjualnya sebanyak {}.",
				" Anda menjumpai kapal layar dan membuat keputusan untuk merompaknya. Anda mendapat sebanyak {}.",
				" Anda berjaya mencuri kapal terbang dan menjumpai duit sebanyak {}."
			]),
			failure: FA([
				"Anda telah mencuba untuk merompak sebuah bank. Anda gagal dan mendapat {}.",
				" Anda telah mencuba untuk mencuri dari seorang wanita tua dan terkena beg tangan dan hilang sebanyak {}.",
				"Anda cuba untuk merompak sebuah trak berperisai.Malang sekali, anda dilanggar olehnya dan menetap semula dalam {} bil perubatan.",
				" Anda cuba untuk merompak sebuah kedai runcit tetapi dipujuk untuk membeli arak {}.",
				"Anda telah mencuba untuk mencuri beberapa batu dari tapak pembinaan dan akhirnya disaman sebanyak {}.",
				"Anda fikir mencuri batu-bata adalah idea yang baik tetapi akhirnya batu-bata itu dijatuhkan ke kaki anda dan perlu membayar sebanyak {} dalam bil perubatan.",
				"Anda cuba untuk meragut dari seorang wanita tua.Malang sekali, anda dipukul oleh wanita tua itu dan wanita tua itu meragut anda dan anda kehilangan sebanyak {}.",
				"<:DonutPolice:832053147001290754> Sergant Mustard dari Polis Donut menangkap anda kerana anda cuba mencuri donat legenda! dan anda kehilangan sebanyak {}.",
				"Anda melihat kapal layar gergasi dan membuat keputusan untuk menaikinya. Kemudian ia berlepas dan anda tersekat di atasnya kemudian anda ditahan oleh Sergant Mustard dan anda disaman kerana {}.",
				"Anda cuba untuk mencuri kapal terbang. Malang sekali, kapal yang anda curi itu terhempas. Anda perlu membayar {} untuk kos perubatan dan ganti rugi."
			])
		},
		order: {
			success: new Formattable("[yes] Pesanan anda untuk ** {} ** telah dibuat! ID pesanan adalah {}."),
			exists: "[no] You already have an active order."
		},
		claim: {
			success: new Formattable("[yes] You have successfully claimed the order `{}`."),
			exists: "[no] Anda sudah mempunyai pesanan yang dituntut.",
			own: "[no] Anda tidak boleh menuntut pesanan anda sendiri.",
		},
		unclaim: {
			notFound: "[no] Anda belum menuntut sebarang pesanan.",
			success: new Formattable("[yes] Pesanan {} berjaya dibatalkan.")
		},
		brew: {
			success: "[yes] Pesanan telah dibuat. Sedang membuat penapaian...",
		},
		finishdelivery: {
			channel: "[no] Anda tidak berada di saluran penghantaran yang betul.",
			success: "[truck] Penghantaran disahkan.",
		}
	},
	errors: {
		codes: {
			10004: "[no] Ralat: Persekutuan tidak diketahui.",
			50013: "[no] Ralat: Kehilangan kebenaran. Bot ini tidak mempunyai kebenaran yang mencukupi untuk menjalankan tugas yang diminta.",
		},
		internal: new Formattable("🔌 Maaf, terdapat ralat dalaman. \ N``js \ n {} \ n``"),
		args: new Formattable("{} \ n ** Sintaks Yang Betul **: `{} {} {}`"),
		argsTypes: [
			new Formattable("Hujah `{}` adalah jenis yang tidak betul."),
			new Formattable("Hujah `{}` diperlukan, tetapi tidak dijumpai."),
		],
		permission: new Formattable("[no] Anda tidak mempunyai izin untuk melaksanakan perintah ini. Anda mesti mempunyai izin `{}` untuk melaksanakan perintah ini"),
		graph: new Formattable("[no]Persamaan tidak sah. \ N` {} `"),
		cooldown: new Formattable("[no] Anda harus menunggu {} sebelum anda dapat menggunakan perintah {} sekali lagi."),
		guildPermission: new Formattable("[no] Saya tidak mempunyai kebenaran yang mencukupi dalam server ini untuk menjalankan tugas yang diminta. Saya masih memerlukan kebenarannya {}."),
		noOrder: "[terputus] Anda tidak mempunyai pesanan aktif pada masa ini.",
		noClaimedOrder: "[terputus] Anda tidak mempunyai pesanan untuk dituntut.",
		notPreparing: "[terputus] Pesanan yang anda buat masa ini belum selesai.",
		notDelivering: "[terputus] Pesanan yang ditentukan tidak siap untuk dihantar.",
		url: "🔗Pautan yang anda berikan bukan url."
	},
};
