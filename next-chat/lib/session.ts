import nextSession from 'next-session';
import { expressSession } from 'next-session/lib/compat'
import MongoDBStore from 'connect-mongodb-session';

const store = MongoDBStore(expressSession);

export const getSession = nextSession({ store, cookie: { path: '/', maxAge: 1000 * 60 * 60 * 24 * 7 } })