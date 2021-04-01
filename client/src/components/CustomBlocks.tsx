import { Box, Text, Button, Select, DataChart, TextInput } from 'grommet'
import React from 'react'
import {
  CustomSelectProps,
  CustomBoxProps,
  CustomTextProps,
  CustomButtonProps,
  CustomGuitarFretProps,
  CustomMelodyVisualizeProps,
  CustomMelodySourceTextInputProps,
  CustomMelodyChartProps,
} from './interfaces'

//! https://v2.grommet.io/components

// Выпадающий список для форм
export function CustomSelect(props: CustomSelectProps): JSX.Element {
  // function Example() {
  //   const [value, setValue] = React.useState('medium');
  //   return (
  //     <Select
  //       options={['small', 'medium', 'large']}
  //       value={value}
  //       onChange={({ option }) => setValue(option)}
  //     />
  //   );
  // }
  //   const [value, setValue] = React.useState(props?.value ?? props.options[0])
  // const onChange = selectedValue => reducer(selectedValue)

  return <Select options={props.options} value={props?.value ?? props.options[0]} onChange={v => props.onChange} />
}

// Контейнер
export function CustomBox(props: CustomBoxProps): JSX.Element {
  //   <Box
  //   direction="row"
  //   border={{ color: 'brand', size: 'large' }}
  //   pad="medium"
  // >
  //   <Box pad="small" background="dark-3" />
  //   <Box pad="medium" background="light-3" />
  // </Box>

  // <Box
  //     height='xlarge'
  //     background='linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)'
  //     round
  //     alignSelf='start'
  //   >

  return <Box {...props}></Box>
}

// Показ текста
export function CustomText(props: CustomTextProps): JSX.Element {
  return (
    <CustomBox>
      <Text>{props?.label ?? ''}</Text>
      <Text>{props.text}</Text>
    </CustomBox>
  )
}

// Кнопка
export function CustomButton(props: CustomButtonProps): JSX.Element {
  return <Button></Button>
}

export function CustomGuitarFret(props: CustomGuitarFretProps): JSX.Element {
  const { note, octave, ...options } = props

  return <Button {...options}>{`${note}${octave}`}</Button>
}

export function CustomMelodyVisualize(props: CustomMelodyVisualizeProps): JSX.Element {
  return (
    <Box>
      <Text>Waiting for data...</Text>
      <div></div>
    </Box>
  )
}

export function CustomMelodySourceTextInput(props: CustomMelodySourceTextInputProps): JSX.Element {
  //v2.grommet.io/textinput

  // function Example() {
  //   const [value, setValue] = React.useState('');
  //   return (
  //     <TextInput
  //       placeholder="type here"
  //       value={value}
  //       onChange={event => setValue(event.target.value)}
  //     />
  //   );
  // }

  https: const [value, setValue] = React.useState(`${props?.text ?? ''}`)

  return (
    <TextInput
      value={value}
      onChange={e => {
        setValue(e.target.value)
        props.onChange(e.target.value)
      }}
    />
  )
}

export function CustomMelodyChart(props: CustomMelodyChartProps): JSX.Element {
  //v2.grommet.io/datachart
  // () => {
  //   const data = [{ date: '2020-08-20', amount: 2 }, { date: '2020-08-21', amount: 47 }, { date: '2020-08-22', amount: 33 }];
  //   return (
  //     <DataChart
  //       data={data}
  //       series={['date', 'amount']}
  //       chart={[
  //         { property: 'amount', type: 'line', opacity: 'medium', thickness: 'xsmall', round },
  //         { property: 'amount', type: 'point', point: 'star', thickness: 'medium' }
  //       ]}
  //     />
  //   );
  // }
  return <Box></Box>
  // https: return (
  //   <DataChart
  //     data={props.data}
  //     series={['noteIndex', 'noteChar']}
  //     chart={[
  //       { property: 'noteChar', type: 'line' },
  //       { property: 'noteIndex', type: 'point' },
  //     ]}
  //   />
  // )
}
export function CustomMelodyDiagram(props: CustomMelodyChartProps): JSX.Element {
  // https://v2.grommet.io/diagram

  //   <Stack guidingChild={1}>
  //   <Diagram
  //     connections={[
  //       {
  //         fromTarget: '1',
  //         toTarget: '2',
  //         thickness: 'xsmall',
  //         color: 'accent-2',
  //       },
  //       {
  //         fromTarget: '1',
  //         toTarget: '4',
  //         thickness: 'xsmall',
  //         color: 'accent-2',
  //         type: 'rectilinear',
  //       },
  //     ]}
  //   />
  //   <Box>
  //     <Box direction="row">
  //       <Box id="1" margin="small" pad="medium" background="light-4" />
  //       <Box id="2" margin="small" pad="medium" background="light-4" />
  //     </Box>
  //     <Box direction="row">
  //       <Box id="3" margin="small" pad="medium" background="light-4" />
  //       <Box id="4" margin="small" pad="medium" background="light-4" />
  //     </Box>
  //   </Box>
  // </Stack>
  return <Box></Box>
}

// const icon_names = `
// Accessibility
// Achievement
// Action
// Actions
// Ad
// AddCircle
// Add
// Aed
// Aggregate
// AidOption
// Aid
// Alarm
// Alert
// Amazon
// Amex
// Analytics
// Anchor
// Android
// Announce
// AppleAppStore
// Apple
// AppsRounded
// Apps
// Archive
// Archlinux
// Article
// Aruba
// Ascend
// Ascending
// AssistListening
// Atm
// Attachment
// Attraction
// Baby
// BackTen
// BarChart
// Bar
// Basket
// Beacon
// Bike
// Bitcoin
// BladesHorizontal
// BladesVertical
// BlockQuote
// Blog
// Bluetooth
// Bold
// Book
// Bookmark
// BottomCorner
// Braille
// Briefcase
// Brush
// Bug
// Bundle
// Bus
// BusinessService
// Cafeteria
// Calculator
// Calendar
// Camera
// Capacity
// Car
// CaretDownFill
// CaretDown
// CaretNext
// CaretPrevious
// CaretUpFill
// CaretUp
// Cart
// CatalogOption
// Catalog
// Centos
// Certificate
// Channel
// ChapterAdd
// ChapterNext
// ChapterPrevious
// ChatOption
// Chat
// CheckboxSelected
// Checkbox
// Checkmark
// Chrome
// CircleAlert
// CircleInformation
// CirclePlay
// CircleQuestion
// ClearOption
// Clear
// Cli
// Clipboard
// Clock
// Clone
// Close
// ClosedCaption
// CloudComputer
// CloudDownload
// CloudSoftware
// CloudUpload
// Cloud
// Cloudlinux
// Cluster
// CoatCheck
// CodeSandbox
// Code
// Codepen
// Coffee
// Columns
// Command
// Compare
// Compass
// Compliance
// Configure
// Connect
// Connectivity
// Console
// ContactInfo
// Contact
// Contract
// Copy
// Cpu
// CreativeCommons
// CreditCard
// Css3
// Cube
// Cubes
// Currency
// Cursor
// Cut
// Cycle
// Dashboard
// Database
// Debian
// Deliver
// Deploy
// Descend
// Descending
// Desktop
// Detach
// Device
// Diamond
// Directions
// DisabledOutline
// Disc
// Dislike
// Docker
// DocumentCloud
// DocumentConfig
// DocumentCsv
// DocumentDownload
// DocumentExcel
// DocumentImage
// DocumentLocked
// DocumentMissing
// DocumentNotes
// DocumentOutlook
// DocumentPdf
// DocumentPerformance
// DocumentPpt
// DocumentRtf
// DocumentSound
// DocumentStore
// DocumentTest
// DocumentText
// DocumentThreat
// DocumentTime
// DocumentTransfer
// DocumentTxt
// DocumentUpdate
// DocumentUpload
// DocumentUser
// DocumentVerified
// DocumentVideo
// DocumentWindows
// DocumentWord
// DocumentZip
// Document
// Domain
// Dos
// Down
// DownloadOption
// Download
// Drag
// Drawer
// Dribbble
// DriveCage
// Dropbox
// Duplicate
// Dxc
// Ebay
// Edge
// Edit
// Eject
// Elevator
// Emergency
// Emoji
// EmptyCircle
// Erase
// Escalator
// Expand
// Ezmeral
// FacebookOption
// Facebook
// FanOption
// Fan
// FastForward
// Favorite
// Fedora
// Figma
// Filter
// FingerPrint
// Fireball
// Firefox
// Firewall
// FlagFill
// Flag
// Flows
// FolderCycle
// FolderOpen
// Folder
// FormAdd
// FormAttachment
// FormCalendar
// FormCheckmark
// FormClock
// FormClose
// FormCut
// FormDown
// FormEdit
// FormFilter
// FormFolder
// FormLocation
// FormLock
// FormNextLink
// FormNext
// FormPreviousLink
// FormPrevious
// FormRefresh
// FormSchedule
// FormSearch
// FormSubtract
// FormTrash
// FormUp
// FormUpload
// FormViewHide
// FormView
// ForwardTen
// Freebsd
// Gallery
// Gamepad
// Gateway
// Gatsbyjs
// Gem
// Gift
// Github
// Globe
// Golang
// GooglePlay
// GooglePlus
// GoogleWallet
// Google
// GraphQl
// Gremlin
// Grid
// Grommet
// Group
// Grow
// Hadoop
// Halt
// HelpOption
// Help
// Heroku
// Hide
// History
// HomeOption
// Home
// Horton
// HostMaintenance
// Host
// Hp
// HpeLabs
// Hpe
// Hpi
// Html5
// IceCream
// Image
// Impact
// InProgress
// Inbox
// Indicator
// Info
// Inherit
// Inspect
// Instagram
// InstallOption
// Install
// Integration
// InternetExplorer
// Italic
// Iteration
// Java
// Js
// Key
// Keyboard
// Language
// Lastfm
// Launch
// Layer
// License
// Like
// LineChart
// LinkBottom
// LinkDown
// LinkNext
// LinkPrevious
// LinkTop
// LinkUp
// Link
// LinkedinOption
// Linkedin
// List
// Local
// LocationPin
// Location
// Lock
// Login
// Logout
// Lounge
// Magic
// MailOption
// Mail
// Mandriva
// Manual
// MapLocation
// Map
// Mastercard
// Medium
// Memory
// Menu
// Microfocus
// Microphone
// Money
// Monitor
// Monospace
// Moon
// MoreVertical
// More
// Mouse
// Multimedia
// Multiple
// Music
// Mysql
// Navigate
// NetworkDrive
// Network
// NewWindow
// New
// Next
// Node
// Nodes
// Norton
// Note
// Notes
// Notification
// Npm
// ObjectGroup
// ObjectUngroup
// OfflineStorage
// Onedrive
// Opera
// Optimize
// Oracle
// OrderedList
// Organization
// Overview
// Package
// Paint
// Pan
// PauseFill
// Pause
// Paypal
// Performance
// PersonalComputer
// PhoneFlip
// PhoneHorizontal
// PhoneVertical
// Phone
// PieChart
// PiedPiper
// Pin
// Pinterest
// Plan
// PlayFill
// Play
// Plug
// Pocket
// PowerCycle
// PowerForceShutdown
// PowerReset
// PowerShutdown
// Power
// Previous
// Print
// ProductHunt
// Projects
// Qr
// RadialSelected
// Radial
// Raspberry
// Reactjs
// Reddit
// Redhat
// Redo
// Refresh
// Resources
// Restaurant
// RestroomMen
// RestroomWomen
// Restroom
// Resume
// Return
// Revert
// Rewind
// Risk
// Robot
// RotateLeft
// RotateRight
// Rss
// Run
// SafariOption
// Sans
// Satellite
// Save
// Scan
// ScheduleNew
// SchedulePlay
// Schedule
// Schedules
// Sco
// Scorecard
// Script
// Sd
// SearchAdvanced
// Search
// Secure
// Select
// Selection
// Semantics
// Send
// ServerCluster
// Server
// Servers
// ServicePlay
// Services
// SettingsOption
// ShareOption
// ShareRounded
// Share
// ShieldSecurity
// Shield
// Shift
// Shop
// Sidebar
// Sign
// Skype
// Slack
// Snapchat
// Solaris
// Sort
// Soundcloud
// Spa
// Spectrum
// Split
// Splits
// Spotify
// Square
// StackOverflow
// Stakeholder
// StarHalf
// Star
// StatusCriticalSmall
// StatusCritical
// StatusDisabledSmall
// StatusDisabled
// StatusGoodSmall
// StatusGood
// StatusInfoSmall
// StatusInfo
// StatusPlaceholderSmall
// StatusPlaceholder
// StatusUnknownSmall
// StatusUnknown
// StatusWarningSmall
// StatusWarning
// StepsOption
// Steps
// StopFill
// Stop
// Storage
// StreetView
// StrikeThrough
// Stripe
// Subscript
// SubtractCircle
// Subtract
// Sun
// Superscript
// Support
// Suse
// Swift
// Swim
// Switch
// Sync
// System
// TableAdd
// Table
// Tag
// TapeOption
// Tape
// Target
// Task
// Tasks
// Technology
// Template
// Terminal
// TestDesktop
// Test
// TextAlignCenter
// TextAlignFull
// TextAlignLeft
// TextAlignRight
// TextWrap
// Threats
// ThreeDffects
// ThreeD
// Ticket
// Tictok
// Time
// Tip
// Toast
// Tools
// Tooltip
// TopCorner
// Train
// Transaction
// Trash
// TreeOption
// Tree
// Trigger
// Trophy
// Troubleshoot
// Tty
// Tumblr
// Turbolinux
// Twitter
// Ubuntu
// Underline
// Undo
// Unlink
// Unlock
// UnorderedList
// Unsorted
// Up
// Update
// Upgrade
// UploadOption
// Upload
// UsbKey
// UserAdd
// UserAdmin
// UserExpert
// UserFemale
// UserManager
// UserNew
// UserPolice
// UserSettings
// UserWorker
// User
// Validate
// Vend
// Video
// View
// Vimeo
// VirtualMachine
// VirtualStorage
// Visa
// VmMaintenance
// Vmware
// VolumeControl
// VolumeLow
// VolumeMute
// Volume
// Vulnerability
// Waypoint
// `
