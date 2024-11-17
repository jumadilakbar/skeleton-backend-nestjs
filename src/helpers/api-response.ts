const successResponse = ({
  code = 200,
  message,
  data,
}: {
  code?: number;
  message: string;
  data: any;
}) => ({
  statusCode: code,
  message,
  data,
});

const failResponse = ({ code, message }) => ({
  statusCode: code,
  message,
});

const responseMessages = {
  success: 'success',
  createSuccess: 'add data successfully',
  updateSuccess: 'update data successfully',
  deleteSuccess: 'delete data successfuly',
  notFound: 'not found',
  successAuth: 'success to auth',
  failedAuth: 'failed to auth',
};

export { successResponse, failResponse, responseMessages };
