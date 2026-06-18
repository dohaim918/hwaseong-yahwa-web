import { useState } from "react"
import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
import { flexCol, flexRow, focusRing, selectableSurface } from "@/styles/mixins"
import { UI_TEXT } from "@/data/uiText"
import { CheckIcon } from "@/components/ui/icons"
import StepHeading from "../StepHeading"
import SummaryPanel from "../SummaryPanel"
import {
  BookingCallout,
  BookingFieldError,
  BookingPanel,
  BookingSplit,
  BookingStack,
} from "../BookingPanel"
import { formatPayerField, normalizePayerField } from "../bookingFlow"

const t = UI_TEXT.booking
const FIELD_META = {
  name: { autoComplete: "name", maxLength: 40 },
  phone: { autoComplete: "tel", inputMode: "tel", maxLength: 13 },
  email: { autoComplete: "email", inputMode: "email", maxLength: 254 },
}

export default function Step4Payment({
  reservation,
  payer,
  accent,
  onPayer,
  payment,
  onPayment,
  agree,
  onAgree,
  totals,
  onAgreeView,
  errors = {},
}) {
  const [touched, setTouched] = useState({})
  const setField = (id, value) =>
    onPayer((prev) => ({ ...prev, [id]: formatPayerField(id, value) }))
  const blurField = (id) => {
    setTouched((prev) => ({ ...prev, [id]: true }))
    onPayer((prev) => ({ ...prev, [id]: normalizePayerField(id, prev[id]) }))
  }
  const toggle = (id) => onAgree((prev) => ({ ...prev, [id]: !prev[id] }))
  const showFieldError = (id) => Boolean(errors[id]) && (touched[id] || payer[id])

  return (
    <>
      <StepHeading stepNo={4} title={t.step4.title} desc={t.step4.desc} accent={accent} />

      <BookingSplit>
        <BookingStack $gap={T.spacing[20]}>
          <BookingPanel title={t.payer.title}>
            <Fields>
              {t.payer.fields.map((f) => {
                const error = showFieldError(f.id) ? errors[f.id] : null
                const errorId = error ? `payer-${f.id}-error` : undefined

                return (
                  <Field key={f.id}>
                    <FieldLabel htmlFor={`payer-${f.id}`}>
                      {f.label}
                      {f.required && <Req $accent={accent}>*</Req>}
                    </FieldLabel>
                    <Input
                      id={`payer-${f.id}`}
                      type={f.type}
                      placeholder={f.placeholder}
                      value={payer[f.id]}
                      onChange={(e) => setField(f.id, e.target.value)}
                      onBlur={() => blurField(f.id)}
                      aria-invalid={error ? "true" : undefined}
                      aria-describedby={errorId}
                      {...FIELD_META[f.id]}
                      $accent={accent}
                    />
                    {error && (
                      <BookingFieldError id={errorId} accent={accent} aria-live="polite">
                        {error}
                      </BookingFieldError>
                    )}
                  </Field>
                )
              })}
            </Fields>
          </BookingPanel>

          <BookingPanel title={t.paymentTitle}>
            <PayGrid>
              {t.paymentMethods.map((m) => (
                <PayMethod
                  key={m.id}
                  type="button"
                  $selected={payment === m.id}
                  $accent={accent}
                  onClick={() => onPayment(m.id)}
                  aria-pressed={payment === m.id}
                >
                  {m.label}
                </PayMethod>
              ))}
            </PayGrid>
          </BookingPanel>

          <Agreements>
            {t.agreements.map((a) => (
              <AgreeRow key={a.id}>
                <AgreeLeft
                  type="button"
                  role="checkbox"
                  aria-checked={agree[a.id]}
                  onClick={() => toggle(a.id)}
                  $accent={accent}
                >
                  <Box $checked={agree[a.id]} $accent={accent}>
                    {agree[a.id] && <CheckIcon size={12} color={T.white} />}
                  </Box>
                  <Tag $required={a.required} $accent={accent}>
                    [{t.agreeTag[a.required ? "required" : "optional"]}]
                  </Tag>
                  <AgreeLabel>{a.label}</AgreeLabel>
                </AgreeLeft>
                <ViewBtn type="button" onClick={onAgreeView} $accent={accent}>
                  {t.agreeView}
                </ViewBtn>
              </AgreeRow>
            ))}
          </Agreements>
        </BookingStack>

        <BookingStack>
          <SummaryPanel reservation={reservation} totals={totals} accent={accent} />
          <BookingCallout accent={accent} tone="success" center>
            {t.issueNote}
          </BookingCallout>
        </BookingStack>
      </BookingSplit>
    </>
  )
}

const Fields = styled.div`
  ${flexCol(`calc(${T.spacing[24]} + ${T.spacing[4]})`)}
`

const Field = styled.div`
  ${flexCol()}
  position: relative;
`

const FieldLabel = styled.label`
  margin-bottom: ${T.spacing[8]};
  font-size: ${T.fontSize.xs};
  color: ${T.sub};
`

const Req = styled.span`
  margin-left: ${T.spacing[4]};
  color: ${({ $accent }) => $accent};
`

const Input = styled.input`
  width: 100%;
  height: ${T.spacing[48]};
  padding: 0 ${T.spacing[16]};
  border-radius: ${T.radius.md};
  background: ${alpha(T.white, 0.04)};
  border: 1px solid ${alpha(T.white, 0.1)};
  color: ${T.main};
  font-size: ${T.fontSize.sm};
  transition:
    border-color ${T.transition.fast},
    background ${T.transition.fast};

  &::placeholder {
    color: ${T.muted};
  }
  &:hover {
    border-color: ${alpha(T.white, 0.18)};
  }
  &:focus {
    outline: none;
    border-color: ${({ $accent }) => $accent};
    background: ${({ $accent }) => alpha($accent, 0.06)};
  }
`

const PayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${T.spacing[12]};

  @media (max-width: ${T.bp.mini}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const PayMethod = styled.button`
  ${flexRow()}
  justify-content: center;
  min-height: ${T.spacing[48]};
  padding: ${T.spacing[12]};
  font-size: ${T.fontSize.smFluid};
  font-weight: 600;
  color: ${({ $selected, $accent }) => ($selected ? $accent : T.sub)};
  transition:
    background ${T.transition.fast},
    border-color ${T.transition.fast},
    color ${T.transition.fast};
  ${({ $selected, $accent }) =>
    selectableSurface($accent, $selected, {
      radius: T.radius.lg,
      idleBg: alpha(T.white, 0.03),
      idleBorder: alpha(T.white, 0.1),
    })}

  &:hover {
    color: ${({ $accent }) => $accent};
  }
`

// ── 약관
const Agreements = styled.div`
  position: relative;
  ${flexCol(T.spacing[12])}
  padding: 0 ${T.spacing[4]};
`

const AgreeRow = styled.div`
  ${flexRow()}
  align-items: flex-start;
  justify-content: space-between;
  gap: ${T.spacing[12]};
`

const AgreeLeft = styled.button`
  ${flexRow(T.spacing[8])}
  align-items: flex-start;
  min-width: 0;
  padding: ${T.spacing[4]};
  margin: calc(-1 * ${T.spacing[4]});
  border-radius: ${T.radius.sm};
  background: none;
  color: inherit;
  text-align: left;
  cursor: pointer;

  ${({ $accent }) => focusRing(alpha($accent, 0.7), T.radius.sm)}
`

const Box = styled.span`
  flex-shrink: 0;
  width: ${T.spacing[20]};
  height: ${T.spacing[20]};
  border-radius: ${T.radius.xs};
  ${flexRow()}
  justify-content: center;
  background: ${({ $checked, $accent }) => ($checked ? $accent : "transparent")};
  border: 1px solid ${({ $checked, $accent }) => ($checked ? $accent : alpha(T.white, 0.2))};
  transition:
    background ${T.transition.fast},
    border-color ${T.transition.fast};
`

const Tag = styled.span`
  flex-shrink: 0;
  font-size: ${T.fontSize.xs};
  font-weight: 600;
  color: ${({ $required, $accent }) => ($required ? $accent : T.sub)};
`

const AgreeLabel = styled.span`
  font-size: ${T.fontSize.smFluid};
  line-height: 1.4;
  color: ${T.main};
`

const ViewBtn = styled.button`
  flex-shrink: 0;
  font-size: ${T.fontSize.xs};
  color: ${T.sub};
  text-decoration: underline;
  text-underline-offset: ${T.spacing[4]};
  cursor: pointer;

  &:hover {
    color: ${T.main};
  }

  ${({ $accent }) => focusRing(alpha($accent, 0.7), T.radius.xs)}
`
