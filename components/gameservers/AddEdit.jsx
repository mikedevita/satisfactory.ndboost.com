import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { gameServerService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const gameServer = props?.gameServer;
    const isAddMode = !gameServer;
    const router = useRouter();
    
    function ipv4(message = 'Invalid IP address') {
        return this.matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
          message,
          excludeEmptyString: true
        }).test('ip', message, value => {
          return value === undefined || value.trim() === ''
            ? true
            : value.split('.').find(i => parseInt(i, 10) > 255) === undefined;
        });
    }

    Yup.addMethod(Yup.string, 'ipv4', ipv4);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        ipAddress: Yup.string()
            .ipv4()
            .required('Last Name is required'),
        queryPort: Yup.number()
            .required('Query port is required'),
            
        beaconPort: Yup.number()
            .required('Beacon Port is required'),
        gamePort: Yup.number()
            .required('Game Port is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (!isAddMode) {
        formOptions.defaultValues = props.gameServer;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return isAddMode
            ? createGameServer(data)
            : updateGameServer(gameServer.id, data);
    }

    function createGameServer(data) {
        return gameServerService.create(data)
            .then(() => {
                alertService.success('Game Server added', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch(alertService.error);
    }

    function updateGameServer(id, data) {
        return gameServerService.update(id, data)
            .then(() => {
                alertService.success('Game Server updated', { keepAfterRouteChange: true });
                router.push('..');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="form-group col">
                    <label>Game Server Name</label>
                    <input
                        name="name"
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        {...register('name')}
                    />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label>Game Server IP Address</label>
                    <input
                        name="ipAddress"
                        type="text"
                        className={`form-control ${errors.ipAddress ? 'is-invalid' : ''}`}
                        {...register('ipAddress')}
                    />
                    <div className="invalid-feedback">{errors.ipAddress?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label>Game Server Query Port</label>
                    <input
                        name="queryPort"
                        type="number"
                        defaultValue={15777}
                        className={`form-control ${errors.queryPort ? 'is-invalid' : ''}`}
                        {...register('queryPort')}
                    />
                    <div className="invalid-feedback">{errors.queryPort?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Game Server Beacon Port</label>
                    <input
                        name="beaconPort"
                        type="number"
                        defaultValue={15000}
                        className={`form-control ${errors.beaconPort ? 'is-invalid' : ''}`}
                        {...register('beaconPort')}
                    />
                    <div className="invalid-feedback">{errors.beaconPort?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Game Server Game Port</label>
                    <input
                        name="gamePort"
                        type="number"
                        defaultValue={7000}
                        className={`form-control ${errors.gamePort ? 'is-invalid' : ''}`}
                        {...register('gamePort')}
                    />
                    <div className="invalid-feedback">{errors.gamePort?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/gameservers" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}