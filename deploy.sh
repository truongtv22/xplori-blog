rm landing.tar.gz
cp .env.production.save .env
yarn install
yarn build
rm -rf .next/cache/
tar cf landing.tar.gz .next
scp landing.tar.gz XploriProd:~/xplori/xplori-landing/
