import { menu } from '../../../admin/index.js';
import { useEnvironmentVariableToDisableActions } from '../../../admin/features/useEnvironmentVariableToDisableActions.js';
import { ResourceFunction } from '../../../admin/types/index.js';
import { ServiceModel } from '../models/index.js';

export const CreateServiceModelResource: ResourceFunction<typeof ServiceModel> = () => ({
  resource: ServiceModel,
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
