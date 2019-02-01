import * as React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import FormLabel from '@material-ui/core/FormLabel'; // ??

import { Button, FormControlLabel, Radio } from 'shared/view/elements';
import { TextInputField, SelectField, NumberInputField, RadioGroupInputField } from 'shared/view/form';
import { Dialog } from 'shared/view/components';

import { IFormFields } from '../../../namespace';
import { searchByOptions } from './constants';
import './SearchSettingsDialog.scss';

interface IProps {
  isOpen: boolean;
  fieldNames: Record<keyof IFormFields, string>;
  onClose(): void;
}

const b = block('search-settings-dialog');

class SearchSettingsDialog extends React.PureComponent<IProps, {}> {
  public render() {
    const { isOpen, onClose } = this.props;
    return (
      <Dialog
        title="Search settings"
        onClose={onClose}
        isOpen={isOpen}
        renderActions={this.renderActions}
      >
        <div className={b()}>
          {this.renderFirstRowSettings()}
          {this.renderSecondRowSettings()}
        </div>
      </Dialog>
    );
  }

  @bind
  private renderActions() {
    const { onClose } = this.props;
    return (
      <div className={b('actions')}>
        <Button variant="outlined" onClick={onClose}>Ok</Button>
      </div>
    );
  }

  private renderFirstRowSettings() {
    const { fieldNames } = this.props;
    return (
      <div className={b('row')}>
        <div className={b('item')}>
          <SelectField options={searchByOptions} label="Search by" name={fieldNames.searchBy} fullWidth />
        </div>
        <div className={b('item')}>
          <TextInputField name={fieldNames.reposLanguage} label="Repositories language" />
        </div>
      </div>
    );
  }

  private renderSecondRowSettings() {
    return (
      <div className={b('row')}>
        <div className={b('item')}>
          {this.renderSearchTypeSettings()}
        </div>
        <div className={b('item')}>
          {this.renderRepositoriesNumberSettings()}
        </div>
      </div>
    );
  }

  private renderSearchTypeSettings() {
    const { fieldNames } = this.props;
    return (
      <RadioGroupInputField name={fieldNames.searchType} label="Search type">
        <FormControlLabel value="user" control={<Radio />} label="Only users" />
        <FormControlLabel value="org" control={<Radio />} label="Only organizations" />
        <FormControlLabel value="both" control={<Radio />} label="Both" />
      </RadioGroupInputField>
    );
  }

  private renderRepositoriesNumberSettings() {
    const { fieldNames } = this.props;
    return (
      <FormLabel>
        Repositories number
        <div className={b('repos-number')}>
          <div className={b('repos-number-input')}>
            <NumberInputField
              name={fieldNames.minRepos}
              label="min"
              fullWidth
            />
          </div>
          <div className={b('repos-number-input')}>
            <NumberInputField
              name={fieldNames.maxRepos}
              label="max"
              fullWidth
            />
          </div>
        </div>
      </FormLabel>
    );
  }

}

export default SearchSettingsDialog;