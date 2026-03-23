import { a as auth } from './chunks/auth_BrZ9-7fq.mjs';
import { a6 as defineMiddleware, af as sequence } from './chunks/sequence_q2GBgLGh.mjs';
import 'piccolore';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const isAuthed = await auth.api.getSession({
    headers: context.request.headers
  });
  if (isAuthed) {
    context.locals.user = isAuthed.user;
    context.locals.session = isAuthed.session;
  } else {
    context.locals.user = null;
    context.locals.session = null;
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
