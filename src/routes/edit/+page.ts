import type { PageLoad } from './$types';

import { zod } from 'sveltekit-superforms/adapters';
import { superValidate, type Infer, type SuperValidated } from 'sveltekit-superforms';
import { sessionConfig, AllCommands } from '$types/config';
import { get } from 'svelte/store';
import { config } from '$stores/session';
import { formSchema, type FormSchema } from '$schemas/editSchema';

export const load: PageLoad = async () => {
	const form: SuperValidated<Infer<FormSchema>> = await superValidate(zod(formSchema));

	const configValue = get(config);

	const keys = Object.keys(sessionConfig).map((key) => ({
		[key]: AllCommands.find((command) => command.cmd === key)
	}));

	for (const keyObject of keys) {
		const key = Object.keys(keyObject)[0];
		const command = keyObject[key];

		// If not value, use default set in schema
		if (configValue[command.cmd] !== undefined) {
			// Convert default value to index
			if (command.type === 'list') {
				form[command.cmd] = command.options.findIndex(
					(option) => option === configValue[command.cmd]
				);
			} else {
				form[command.cmd] = Number(configValue[command.cmd]).toString(16);
			}
		}
	}

	return { form };
};
