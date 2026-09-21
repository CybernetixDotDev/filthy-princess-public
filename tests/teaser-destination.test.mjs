import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { teaserEnterHref } from "../lib/teaser-destination.ts";
test("Store ENTER opens Store, never checkout",()=>{
 assert.equal(teaserEnterHref({destination_type:"store",store_product_id:"product",store_product_active:true}),"/store");
 assert.equal(teaserEnterHref({store_product_id:"product",store_product_active:true}),"/store");
 assert.equal(teaserEnterHref({destination_type:"store",store_product_id:"product",store_product_active:false}),null);
});
test("controlled Promo opens configured private Contribute without checkout or referral mutation",()=>{
 const promo={destination_type:"promo",promo_destination:"contribute",store_product_id:null,store_product_active:false};
 assert.equal(teaserEnterHref(promo,"http://localhost:3000"),"http://localhost:3000/contribute");
 assert.equal(teaserEnterHref(promo,"https://private.example"),"https://private.example/contribute");
 assert.throws(()=>teaserEnterHref(promo,""),/not configured/);
 assert.throws(()=>teaserEnterHref(promo,"javascript:alert(1)"));
 const source=readFileSync(new URL("../components/teaser/teaser-experience.tsx",import.meta.url),"utf8");
 assert.match(source,/<a href={enterHref}/);assert.doesNotMatch(source,/StorePurchaseForm|checkout/);
});
