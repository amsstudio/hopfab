"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var little_state_machine_1 = require("little-state-machine");
var react_hook_form_1 = require("react-hook-form");
var stateMachineActions_1 = require("./stateMachineActions");
var right_arrow_icon_1 = require("../icons/right-arrow-icon");
var down_left_arrow_icon_1 = require("../icons/down-left-arrow-icon");
var exclamation_circle_icon_1 = require("../icons/exclamation-circle-icon");
var g_tag_1 = require("../../utilities/g-tag");
var QuotationStepSpendingLimit = function () {
    var _a = react_hook_form_1.useForm(), register = _a.register, getValues = _a.getValues, setValue = _a.setValue, trigger = _a.trigger, handleSubmit = _a.handleSubmit, errors = _a.formState.errors;
    var _b = little_state_machine_1.useStateMachine({ updateForm: stateMachineActions_1.updateForm, updateMeta: stateMachineActions_1.updateMeta }), actions = _b.actions, state = _b.state;
    var onSubmit = function (data) {
        g_tag_1.analytics("event", "depot_step", {
            event_category: "engagement",
            event_label: "D\u00E9p\u00F4t de projet - \u00C9tape budget",
        });
        actions.updateMeta({ currentStep: state.meta.currentStep + 1 });
    };
    return (<form onSubmit={handleSubmit(onSubmit)} className="flex-auto h-full flex flex-col">
      <div className="flex-auto pt-16">
        <div className="max-w-4xl mx-auto">
          <button onClick={function () {
            return actions.updateMeta({ currentStep: state.meta.currentStep - 1 });
        }} type="button" className="flex items-center font-black text-xsm text-brown-50 uppercase mb-4 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gris-800 focus-visible:ring-brown-50">
            <down_left_arrow_icon_1.default className="mr-2"/>
            <span className="mt-0.5 border-b-2 border-brown-50">Retour</span>
          </button>
          <fieldset>
            <legend className="font-bold text-5xl sm:text-7.5xl text-brown-50 mb-8">
              Votre budget
            </legend>
            <div className="grid sm:grid-cols-3 gap-x-18 mx-auto">
              <div>
                <div className="mt-1 relative">
                  <input type="number" id="spendinglimit" {...register("spendinglimit", {
        validate: {
            required: function (value) {
                return !!getValues("spendinglimitDontKnow") || !!value
                    ? true
                    : "Le budget est requis";
            },
            min: function (value) {
                return !!getValues("spendinglimitDontKnow") || value > 1
                    ? true
                    : "Le budget doit être supérieur à 1";
            },
        },
    })} inputMode="numeric" defaultValue={state.form.spendinglimit} className={"bg-transparent text-brown-50 block w-full hide-input-spinners pr-10 " + (!errors.spendinglimit
            ? "border-brown-50 focus:ring-brown-50 focus:border-brown-50"
            : "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500") + " disabled:opacity-50"} placeholder="Valeur en €" aria-invalid={!!errors.spendinglimit} aria-describedby="spendinglimit-error" onChange={function (e) {
            actions.updateForm({
                spendinglimit: !isNaN(parseInt(e.target.value, 10))
                    ? parseInt(e.target.value, 10)
                    : null,
            });
            // Si "Je ne sais pas" était sélectionné, on le désélectionne
            if (e.target.value !== null &&
                getValues("spendinglimitDontKnow")) {
                setValue("spendinglimitDontKnow", false);
                actions.updateForm({
                    spendinglimitDontKnow: false,
                });
            }
            trigger("spendinglimitDontKnow");
        }}/>
                  {errors.spendinglimit && (<p className="flex mt-4 text-sm text-red-600" id="spendinglimit-error">
                      <exclamation_circle_icon_1.default className="h-5 w-5 text-red-500 mr-2"/>{" "}
                      {errors.spendinglimit.message}
                    </p>)}
                </div>
              </div>
              <div className="sm:col-span-2 rounded-md -space-y-px">
                <div className="relative py-4 flex">
                  <div className="flex items-center h-5">
                    <input id={"spendinglimitDontKnow"} {...register("spendinglimitDontKnow")} type="checkbox" className="bg-gris-800 h-8 w-8 text-gris-800 cursor-pointer border-brown-50 focus:ring-opacity-50 focus:ring-brown-50 checked:border-brown-50" defaultChecked={state.form.spendinglimitDontKnow} onChange={function (e) {
            actions.updateForm({
                spendinglimitDontKnow: e.target.checked,
            });
            setValue("spendinglimitDontKnow", e.target.checked);
            if (e.target.checked) {
                actions.updateForm({
                    spendinglimit: null,
                });
                setValue("spendinglimit", null);
            }
            trigger("spendinglimit");
        }}/>
                  </div>
                  <label htmlFor={"spendinglimitDontKnow"} className="ml-8 flex flex-col cursor-pointer">
                    <span className="block text-xsm text-brown-50 font-bold uppercase">
                      Je ne sais pas
                    </span>
                  </label>
                </div>
                {errors.spendinglimitDontKnow && (<p className="flex mt-4 text-sm text-red-600" id="spendinglimitDontKnow-error">
                    <exclamation_circle_icon_1.default className="h-5 w-5 text-red-500 mr-2"/>{" "}
                    {errors.spendinglimitDontKnow.message}
                  </p>)}
              </div>
              {state.form.spendinglimitDontKnow && (<div className="sm:col-span-3 mt-6">
                  <div className="text-brown-50 mb-4">
                    Veuillez indiquer au minimum une tranche pour le budget
                    alloué à votre projet
                  </div>
                  <div className="grid sm:grid-cols-3 gap-x-18 mx-auto">
                    {state.data.priceRanges.map(function (priceRange, index) { return (<div key={priceRange.code} className="rounded-md -space-y-px">
                        <div className="relative py-4 flex">
                          <div className="flex items-center h-5">
                            <input id={"priceRangeId-option-" + index} {...register("priceRangeId", {
                validate: {
                    required: function (value) {
                        return !!getValues("spendinglimit") || !!value
                            ? true
                            : "Vous devez sélectionner une option";
                    },
                },
            })} type="radio" className="bg-gris-800 h-8 w-8 text-gris-800 cursor-pointer border-brown-50 focus:ring-opacity-50 focus:ring-brown-50 checked:border-brown-50" value={priceRange.code} defaultChecked={state.form.priceRangeId === priceRange.code} onChange={function (e) {
                    return actions.updateForm({
                        priceRangeId: e.target.value,
                    });
                }}/>
                          </div>
                          <label htmlFor={"priceRangeId-option-" + index} className="ml-8 flex flex-col cursor-pointer">
                            <span className="block text-xsm text-brown-50 font-bold uppercase">
                              {priceRange.label}
                            </span>
                          </label>
                        </div>
                      </div>); })}
                  </div>
                  {errors.priceRangeId && (<p className="flex mt-4 text-sm text-red-600" id="priceRangeId-error">
                      <exclamation_circle_icon_1.default className="h-5 w-5 text-red-500 mr-2"/>{" "}
                      {errors.priceRangeId.message}
                    </p>)}
                </div>)}
            </div>
          </fieldset>
        </div>
      </div>
      <div className="mt-16">
        <button type="submit" className="ml-auto flex items-center font-bold text-5xl sm:text-6xl text-brown-50 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gris-800 focus-visible:ring-brown-50">
          Valider <right_arrow_icon_1.default className="ml-8 w-10 sm:w-12 h-10 sm:h-12"/>
        </button>
      </div>
    </form>);
};
exports.default = QuotationStepSpendingLimit;
//# sourceMappingURL=quotation-step-spendinglimit.jsx.map