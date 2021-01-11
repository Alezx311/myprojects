function mapStateToProps(component) {
  switch (component) {
    case 'Test': {
      return function (state) {
        return {
          message: state.message
        }
      }
    }

    default:
      return 'Invalid component on mapStateToProps'
  }
}

export default mapStateToProps
