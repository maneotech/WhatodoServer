

export enum ApiError {
    // CLASSIC
    NO_ERRORS = 0,
    DEFAULT_ERROR,
    UNKNOWN_ERROR,

    // USER
    USER_UNKOWN_ERROR = 50,
    USER_USER_DOEST_EXIST,
    USER_DATA_IF_EMPTY,
    USER_ROLE_IS_INVALID,
    USER_KEY_IS_NEEDED,
    USER_PASSWORD_IS_EMPTY,
    USER_NICKNAME_IS_EMPTY,
    USER_USERNAME_ALREADY_USED,
    USER_EMAIL_ALREADY_USED,
    USER_UDPATE_ROLE,
    USER_USERNAME_CANT_BE_EMAIL,
    USER_MAIL_IS_INVALID,

    // USER LOGIN
    USER_LOGIN_UNKOWN_ERROR = 100,
    USER_LOGIN_ROLE_IS_INVALID,
    USER_LOGIN_ID_INVALID,
    USER_LOGIN_ID_EMPTY,
    USER_LOGIN_STATUS_DISABLED,
    USER_LOGIN_BODY_EMPTY,
    USER_LOGIN_BODY_ERROR,
    USER_EMPTY,
    USER_WRONG_THIRD_TYPE,
    // USER BADGE
    USER_BADGE_UNKOWN_ERROR = 150,
    USER_BADGE_IDS_BODY,
    USER_BADGE_ID_BODY_INVALID,

    // USER TOKEN
    USER_TOKEN_UNKOWN_ERROR = 200,
    USER_TOKEN_TOKEN_INVALID,
    USER_TOKEN_TOKEN_EXPIRED,
    USER_TOKEN_INVALID_TYPE,
    USER_TOKEN_REFRESH_TOKEN_INVALID,
    USER_TOKEN_REFRESH_TOKEN_EXPIRED,
    USER_TOKEN_REFRESH_TOKEN_ALREADY_USED,

    // PLATFORM
    PLATFORM_UNKOWN_ERROR = 250,
    PLATFORM_DATA_IS_EMPTY,
    PLATFORM_FIELD_IS_INVALID,
    PLATFORM_FIELD_IS_EMPTY,
    PLATFORM_ID_REQUIRED_HEADER,
    PLATFORM_ID_INVALID_HEADER,

    // APPLICATION
    APPLICATION_UNKOWN_ERROR = 300,
    APPLICATION_INVALID_APP_NAME,
    APPLICATION_INVALID_LIFE_CYCLE_ACTION,
    APPLICATION_PLATFORM_IN_BODY,

    // SSE
    SSE_UNKOWN_ERROR = 350,
    SSE_IDENTIFIER_USER_EMPTY,
    SSE_IDENTIFIER_USER_INVALID,
    SSE_IDENTIFIER_PLATFORM_EMPTY,
    SSE_IDENTIFIER_PLATFORM_INVALID,
    SSE_IDENTIFIER__EMPTY,
    SSE_MESSAGE_EMPTY,
    SSE_MESSAGE_EVENT_INVALID,

    // SSE TOKEN
    SSE_TOKEN_UNKOWN_ERROR = 450,
    SSE_TOKEN_USER_INVALID,
    SSE_TOKEN_PLATFORM_INVALID,
    SSE_TOKEN_PLATFORM_UNDEFINED_HEADER,

    // SEARCH
    SEARCH_UNKOWN_ERROR = 450,

    // NOTIFICATION
    NOTIFICATION_UNKOWN_ERROR = 500,
    NOTIFICATION_ID_INVALID,
    NOTIFICATION_DOESNT_EXIST,
    NOTIFICATION_UNAUTHORIZED,

    // AGREEMENT
    AGREEMENT_UNKOWN_ERROR = 550,
    AGREEMENT_VALIDATE_BODY_INVALID,
    AGREEMENT_FILE_DOESNT_EXIST,
    AGREEMENT_TYPE_INVALID,
    AGREEMENT_VERSION_INVALID,
    AGREEMENT_USER_INVALID,

    // POSITION 
    POSITION_UNKOWN_ERROR = 600,
    POSITION_DATA_IS_EMPTY,
    POSITION_FIELD_IS_INVALID,

    // RELATIONSHIP
    RELATIONSHIP_UNKOWN_ERROR = 650,
    RELATIONSHIP_ALREADY_EXIST,
    RELATIONSHIP_WAITING_RESPONSE,
    RELATIONSHIP_DOESNT_EXIST,
    RELATIONSHIP_INVALID_STATUS,

    //PLACE
    PLACE_UNKNOWN_ERROR = 700,
    PLACE_NO_RESULT,
    PLACE_API_FETCHING,
    PLACE_PRICE_TYPE_EMPTY,
    PLACE_ACTIVITY_EMPTY,
    PLACE_BODY_EMPTY,
    PLACE_BODY_ERROR,
    PLACE_ERROR_SPENDING_TOKEN,
    PLACE_NOT_ENOUGH_TOKEN,
    PLACE_NOT_CREATED,
    PLACE_NOT_ACCEPTED,
    PLACE_GET_ACCEPTED,
    PLACE_NOT_REFUSED,
    PLACE_SAVE_SELECTED,
    PLACE_INVALID_REQUEST,
    
    //AD
    AD_BODY_EMPTY = 750,
    AD_BODY_ERROR,
    AD_UNKNOWN_ID,
    AD_INSERT_DB,
    AD_EARN_TOKEN,
    AD_SPONSORSHIP_EXISTS,
    AD_USER_EXISTS,
    AD_DELAY
}