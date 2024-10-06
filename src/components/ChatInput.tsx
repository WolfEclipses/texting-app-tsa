"use client";

import axios from 'axios';
import { FC, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import TextareaAutosize from 'react-textarea-autosize';
import Button from './UI/Button';
import EmojiPicker from 'emoji-picker-react';
import GifPicker, { Theme } from 'gif-picker-react'; // Import GifPicker for Tenor

interface ChatInputProps {
    chatPartner: User;
    chatId: string;
}


const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY // Replace with your Giphy API key
const TENOR_API_KEY = process.env.NEXT_PUBLIC_TENOR_API_KEY || '';

if (!TENOR_API_KEY) {
    throw new Error("TENOR_API_KEY is not defined in the environment variables");
}// Replace with your Tenor API key

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [showGifPicker, setShowGifPicker] = useState<boolean>(false);
    const [gifSource, setGifSource] = useState<'giphy' | 'tenor'>('giphy'); // Track the current GIF source
    const [gifs, setGifs] = useState<any[]>([]);
    const [gifSearch, setGifSearch] = useState<string>('');

    const sendMessage = async () => {
        if (!input) return;
        setIsLoading(true);

        try {
            await axios.post('/api/message/send', { text: input, chatId });
            setInput('');
            textareaRef.current?.focus();
        } catch (error) {
            toast.error('Something went wrong. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmojiClick = (emojiObject: any) => {
        const emoji = emojiObject.emoji;
        if (textareaRef.current) {
            const start = textareaRef.current.selectionStart;
            const end = textareaRef.current.selectionEnd;
            const textBefore = input.substring(0, start);
            const textAfter = input.substring(end, input.length);
            setInput(textBefore + emoji + textAfter);
        }
    };

    const handleGifSearch = async () => {
        if (!gifSearch) return;

        try {
            let response;
            if (gifSource === 'giphy') {
                response = await axios.get(
                    `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${gifSearch}&limit=30`
                );
                setGifs(response.data.data);
            } else if (gifSource === 'tenor') {
                response = await axios.get(
                    `https://api.tenor.com/v1/search?q=${gifSearch}&key=${TENOR_API_KEY}&limit=30`
                );
                setGifs(response.data.results);
            }
        } catch (error) {
            toast.error('Failed to fetch GIFs. Please try again.');
        }
    };

    const selectGif = (gifUrl: string) => {
        if (textareaRef.current) {
            const start = textareaRef.current.selectionStart;
            const end = textareaRef.current.selectionEnd;
            const textBefore = input.substring(0, start);
            const textAfter = input.substring(end, input.length);
            setInput(textBefore + gifUrl + textAfter);
            setShowGifPicker(false);
            sendMessage();
        }
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker((prev) => !prev);
        setShowGifPicker(false); // Close GIF picker when emoji picker is toggled
    };

    const toggleGifPicker = () => {
        setShowGifPicker((prev) => !prev);
        setShowEmojiPicker(false); // Close emoji picker when GIF picker is toggled
    };

    return (
        <div className="px-4 py-4 pt-4 mb-2 sm:mb-0 relative">
            {showGifPicker && gifSource === 'giphy' && (
                <div className="absolute bottom-14 left-2 z-10 bg-gray-200 rounded shadow-lg p-2 dark:bg-zinc-800">
                    <input
                        type="text"
                        value={gifSearch}
                        onChange={(e) => setGifSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGifSearch()}
                        placeholder="Search for GIFs..."
                        className="w-full p-2 border rounded dark:bg-zinc-300"
                    />
                    <div className="grid grid-cols-3 gap-2">
                        {gifs.map((gif) => (
                            <img
                                key={gif.id}
                                src={gif.images.fixed_height_small.url}
                                alt={gif.title}
                                className="cursor-pointer"
                                onClick={() => selectGif(gif.images.fixed_height_small.url)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* GIF Picker for Tenor using gif-picker-react */}
            {showGifPicker && gifSource === 'tenor' && (
                <div className="absolute bottom-14 left-2 z-10 rounded shadow-lg p-2">
                    <GifPicker
                        onGifClick={(gif) => selectGif(gif.url)} // Use the URL from the selected GIF
                        tenorApiKey={TENOR_API_KEY}
                        theme={Theme.AUTO}
                    />
                </div>
            )}
            <div className="py-2 px-2 relative flex items-center overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-accent dark:text-zinc-300">
                {/* Emoji button placed on the left side */}
                <button
                    type="button"
                    onClick={toggleEmojiPicker}
                    className="left-2 bottom-2 text-lg px-2 py-1 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded"
                >
                    😊
                </button>

                {/* GIF button */}
                <button
                    type="button"
                    onClick={toggleGifPicker}
                    className="left-2 bottom-2 text-lg px-2 py-1 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded"
                >
                    GIF
                </button>

                {/* Toggle GIF source */}
                {showGifPicker && (
                    <button
                        type="button"
                        onClick={() => setGifSource((prev) => (prev === 'giphy' ? 'tenor' : 'giphy'))}
                        className="left-2 bottom-2 text-sm px-1 py-1 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded"
                    >
                        {gifSource === 'giphy' ? 'To Tenor' : 'To Giphy'}
                    </button>
                )}

                {/* TextareaAutosize for the chat input */}
                <TextareaAutosize
                    ref={textareaRef}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message ${chatPartner.name}`}
                    className="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-2 sm:text-sm sm:leading-6 dark:text-zinc-300 pt-10"
                />

                {/* Send button */}
                <div className="right-2 bottom-2">
                    <Button isLoading={isLoading} onClick={sendMessage} type="submit">
                        Send
                    </Button>
                </div>
            </div>

            {/* Emoji Picker - positioned to open above the emoji button */}
            {showEmojiPicker && (
                <div className="absolute bottom-14 left-2 z-10 dark:bg-zinc-800 bg-gray-200">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}

            {/* GIF Picker for Giphy */}
            
        </div>
    );
};

export default ChatInput;
