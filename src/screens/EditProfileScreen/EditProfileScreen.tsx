import {View, Text, Image, ActivityIndicator, Alert} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {useForm} from 'react-hook-form';
import React, {useEffect, useState} from 'react';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UsersByUsernameQuery,
  UsersByUsernameQueryVariables,
} from '../../API';
import {deleteUser, getUser, updateUser, usersByUsername} from './queries';
import {useQuery, useMutation, useLazyQuery} from '@apollo/client';
import {useAuthContext} from '../../Contexts/AuthContext';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import styles from './styles';
import CustomInput, {IEditableUser} from './CustomInput';
import {DEFAULT_USER_IMAGE} from '../../config';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | Asset>(null);
  const {control, handleSubmit, setValue} = useForm<IEditableUser>();
  const navigation = useNavigation();

  const {userId, user: authUser} = useAuthContext();

  const {data, loading, error} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userId}, errorPolicy: 'all'},
  );
  const user = data?.getUser;

  const [getUsersByUsername] = useLazyQuery<
    UsersByUsernameQuery,
    UsersByUsernameQueryVariables
  >(usersByUsername, {errorPolicy: 'all'});

  const [
    doUpdateUser,
    {data: updateData, loading: updateLoading, error: updateError},
  ] = useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser, {
    errorPolicy: 'all',
  });

  const [doDelete, {loading: deleteLoading, error: deleteError}] = useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(deleteUser, {errorPolicy: 'all'});

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('username', user.username);
      setValue('bio', user.bio);
      setValue('website', user.website);
    }
  }, [user, setValue]);

  const onSubmit = async (formData: IEditableUser) => {
    await doUpdateUser({
      variables: {input: {id: userId, ...formData, _version: user?._version}},
    });
    navigation.goBack();
  };

  const confirmDelete = () => {
    Alert.alert('Are you sure?', 'Deleting your profile is permanent', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes, delete',
        style: 'destructive',
        onPress: startDeleting,
      },
    ]);
  };

  const startDeleting = async () => {
    if (!user) {
      return;
    }
    //delete from db
    await doDelete({
      variables: {input: {id: userId, _version: user?._version}},
    });
    //delete from Cognito
    await authUser?.deleteUser(err => {
      if (err) {
        console.log(err);
      }
      Auth.signOut();
    });
  };

  const onChangePhoto = () => {
    launchImageLibrary(
      {mediaType: 'photo'},
      ({didCancel, errorCode, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          setSelectedPhoto(assets[0]);
        }
      },
    );
  };

  const validateUsername = (username: string) => {
    // query the database based on usersByUsername

    // if username returns then return error
    return 'Username is already taken';
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || updateError || deleteError) {
    return (
      <ApiErrorMessage
        title="Profile error"
        message={error?.message || updateError?.message}
      />
    );
  }

  return (
    <View style={styles.page}>
      <Image
        source={{uri: selectedPhoto?.uri || user?.image || DEFAULT_USER_IMAGE}}
        style={styles.avatar}
      />
      <Text onPress={onChangePhoto} style={styles.textButton}>
        Change profile photo
      </Text>

      <CustomInput
        name="name"
        control={control}
        rules={{required: 'Name is required'}}
        label="Name"
      />
      <CustomInput
        name="username"
        control={control}
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username should be at least 3 characters.',
          },
          validate: validateUsername,
        }}
        label="Username"
      />
      <CustomInput
        name="website"
        control={control}
        rules={{
          pattern: {
            value: URL_REGEX,
            message: 'Invalid url.',
          },
        }}
        label="Website"
      />
      <CustomInput
        name="bio"
        control={control}
        rules={{
          maxLength: {
            value: 300,
            message: 'User bio should be less than 300 characters.',
          },
        }}
        label="Bio"
        multiline
      />

      <Text onPress={handleSubmit(onSubmit)} style={styles.textButton}>
        {updateLoading ? 'Submitting...' : 'Submit'}
      </Text>
      <Text
        onPress={handleSubmit(confirmDelete)}
        style={styles.textButtonDanger}>
        {deleteLoading ? 'Deleting...' : 'DELETE USER'}
      </Text>
    </View>
  );
};

export default EditProfileScreen;
