// ! Key default types for this application designed to be imported in most crate modules.
// !
// ! Notes:
// !     - The best practice is to have a narrow crate prelude to normalize the key types throughout the application code.
// !     - We keep this as small as possible, and try to limit generic name beside Result and Error (which is re-exported from this module)
// !     - The `f!` macro alias of `format!` (personal preference)
// !

use anyhow::Error;

pub type MyResult<T> = core::result::Result<T, Error>;
