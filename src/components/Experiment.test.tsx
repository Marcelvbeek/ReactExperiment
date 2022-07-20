import React from 'react';
import { render, screen } from '@testing-library/react';
import { Experiment } from './Experiment';
import { ExperimentErrors } from '../config/ExperimentErrors';
import { Variant } from './Variant';

beforeEach(() => {
    jest.spyOn(console, 'error')
        .mockImplementation(() => { });
});

afterAll(() => {
    jest.clearAllMocks();
});

test('it should throw error if experiment has no children', () => {
    expect.assertions(1);
    try {
        // @ts-ignore
        render(<Experiment experimentFlag='test' variantOverride='test'></Experiment>);
    } catch (e: any) {
        expect(e).toBe(ExperimentErrors.ChildrenNotFound);
    }
});

test('it should throw error if experiment has no control as child', () => {
    expect.assertions(1);
    try {
        render(
            <Experiment experimentFlag='test' variantOverride='test'>
                <Variant variantName="test">
                    <div>Test</div>
                </Variant>
            </Experiment>
        );
    } catch (e: any) {
        expect(e).toBe(ExperimentErrors.ControlNotFound);
    }
});

test('it should throw error if children are not of type variant', () => {
    expect.assertions(1);
    try {
        render(
            <Experiment experimentFlag='test' variantOverride='test'>
                <div>Test</div>
                <Variant variantName='control'><div></div></Variant>
            </Experiment>
        );
    } catch (e: any) {
        expect(e).toBe(ExperimentErrors.ChildrenDoesNotMatchVariant);
    }
});

test('it should not throw error if impelemented correctly', () => {
    expect(() => render(
        <Experiment experimentFlag='test' variantOverride='test'>
            <Variant variantName='test'>
                <div>
                    Test
                </div>
            </Variant>
            <Variant variantName='control'>
                <div>
                    Control
                </div>
            </Variant>
        </Experiment>
    )).not.toThrow();
});