import nextSession from 'next-session';
import { promisifyStore } from 'next-session/lib/compat'
import MongoStore from 'connect-mongo';

const store = promisifyStore(MongoStore.create({ mongoUrl: process.env.MONGO_URI, ttl: 60 * 60 * 24 * 7 }));

export const getSession = nextSession({ store, cookie: { path: '/', maxAge: 1000 * 60 * 60 * 24 * 7 } })