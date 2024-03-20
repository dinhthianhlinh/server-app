import { menu } from '../../../admin/index.js';
import { useEnvironmentVariableToDisableActions } from '../../../admin/features/useEnvironmentVariableToDisableActions.js';
import { ResourceFunction } from '../../../admin/types/index.js';
import { TaskModel } from '../models/index.js';

export const CreateTaskModelResource: ResourceFunction<typeof TaskModel> = () => ({
  resource: TaskModel,
  features: [useEnvironmentVariableToDisableActions()],
  options: {
    navigation: menu.mongoose,
    actions: {
      show: {
        showInDrawer: true,
      },
      edit: {
        showInDrawer: true,
      },
      new: {
        showInDrawer: true,
      },
    },
    properties: {
      _id: {
        isTitle: true,
      },
    },
  },
});
