/**
 * Created by steve on 3/22/2017.
 */
import React, {ChangeEvent, FormEvent} from 'react';
import classNames from 'classnames';
import {useDispatch, useSelector} from "react-redux";
import {selectIsAdmin} from "../users";
import {colorChanged, colorChangedAction, saveColorAction, selectColor} from "./index";
import {ProductColorField} from "../../types";
import {Alert, FormColumn} from "chums-ducks";
import ActiveButtonGroup from "../../components/ActiveButtonGroup";


const ColorEditor: React.FC = () => {
    const dispatch = useDispatch();
    const isAdmin = useSelector(selectIsAdmin);
    const selected = useSelector(selectColor);

    const onChangeCode = (ev:ChangeEvent<HTMLInputElement>) => dispatch(colorChangedAction('code', ev.target.value.toUpperCase()));

    const onChange = (field: ProductColorField) => (ev: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        dispatch(colorChangedAction(field, ev.target.value));
    }

    const onChangeActive = () => dispatch(colorChangedAction('active', !selected.active));

    const onSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        dispatch(saveColorAction(selected));
    }

    return (
        <form className="form-horizontal" onSubmit={onSubmit}>
            <h3>Color Editor</h3>
            <FormColumn label="Code">
                <input type="text" readOnly={!isAdmin} value={selected.code}
                       className="form-control form-control-sm"
                       pattern="\S{3,5}" maxLength={5} title="3-5 Characters"
                       onChange={onChangeCode} />
                <small className="text-muted">3-5 Characters</small>
            </FormColumn>
            <FormColumn label="Description">
                <input type="text" readOnly={!isAdmin} value={selected.description}
                       className="form-control form-control-sm"
                       onChange={onChange('description')} />
            </FormColumn>
            <FormColumn label="Notes">
                <textarea readOnly={!isAdmin} value={selected.notes || ''} onChange={onChange('notes')}
                          className="form-control form-control-sm" />
            </FormColumn>
            <FormColumn label="Active">
                <ActiveButtonGroup active={selected.active} onChange={onChangeActive} disabled={!isAdmin}/>
            </FormColumn>
            <FormColumn label="">
                <button type="submit" className="btn btn-sm btn-primary">Save</button>
            </FormColumn>
            {selected.changed && (
                <Alert color="warning">Don't forget to save your changes</Alert>
            )}
        </form>
    )
}
export default ColorEditor;
