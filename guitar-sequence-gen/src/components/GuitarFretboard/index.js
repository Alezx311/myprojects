import React, { Component } from 'react'
import { TextButton, Select } from 'react-nexusui'

// TODO Страница управления

// Строка со псевдо-случайным ID из цифр
const randId = () => String(parseInt(new Date(Date.now()).toUTCString(), '36')) + Date.now()
// Настройка генератора грифа гитары
const FretboardSetup = () => {
  // Количество струн
  const StringSelect = () => {}
  // Настройка гитары
  const TuningSelect = () => {}
  // Количество ладов
  const FretsSelect = () => {}
  // Цвета и внешний вид
  const ThemeSelect = () => {}
  // Размер
  const SizeSelect = () => {}
  // Действие при нажатии (играть ноту, отмечать подходящие, рисовать фразы)
  const ActionOnClickSelect = () => {}
}
// Отображение грифа гитары
const FretboardView = () => {}
// Настройка генератора звука
const SoundSetup = () => {
  // Выбор инструмента
  const InstrumentSelect = () => {}
  // Тип гитары (електро, акустика, бас)
  const GuitarTypeSelect = () => {}
  // Тональность
  const MelodyKeySelect = () => {}
  // Гамма
  const MelodyScaleSelect = () => {}
  // Размер такта
  const MelodyPatternSizeSlider = () => {}
  // Количество тактов
  const MelodySequenceSizeSlider = () => {}
}
// Настройка звучания звука
const SoundControls = () => {
  // Громкость
  const VolumeSlider = () => {}
  // Дополнительные еффекты
  const EffectsRadioButtons = () => {}
  // Пауза
  const PauseButton = () => {}
  // Начать проигрывание
  const PlayButton = () => {}
  // Сгенерировать и сыграть
  const GenerateMelodyAndPlayButton = () => {}
  // Сгенерировать и показать мелодию
  const GenerateMelodyAndViewButton = () => {}
  // Сбросить настройки
  const ResetSettingsButton = () => {}
  // Включить отрисовку мелодии на холсте
  const ToggleCanvasButton = () => {}
}
// Логи и текстовая информация
const LogsView = () => {
  // Для разработки
  const DebugLogs = () => {}
  // Для показа мелодии
  const MelodyLogs = () => {}
}
const TestComponent = () => {
  const opt = {
    text: 'Just Test Component',
    class: 'test_component',
    onClick: e => console.log(e.target.innerText)
  }

  return (
    <div className={opt.class} onClick={opt.onClick}>
      {opt.text}
    </div>
  )
}

const GuitarFretboard = () => {
  return (
    <div>
      <TestComponent />
    </div>
  )
}

export default GuitarFretboard
